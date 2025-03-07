import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { supabase } from '../services/supabase.js';
import { client } from '../index.js';

export function setupWebhookServer() {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // Body parser with size limit
  app.use(express.json({ limit: '1mb' }));

  // Serve static files from the dist directory
  app.use(express.static('dist'));

  // Store episode notifications to batch them
  const episodeNotifications = new Map(); // key: userId_showId, value: { episodes: [], timer }

  const sendBatchedNotification = async (userId, showId) => {
    try {
      const notifications = episodeNotifications.get(`${userId}_${showId}`);
      if (!notifications || !notifications.episodes.length) return;

      // Get show details from subscription
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('tmdb_id', showId)
        .single();

      if (subError || !subscription) {
        console.error('Error fetching subscription:', subError);
        return;
      }

      // Group episodes by season
      const seasons = notifications.episodes.reduce((acc, ep) => {
        acc[ep.season] = acc[ep.season] || [];
        acc[ep.season].push(ep.episode);
        return acc;
      }, {});

      // Create notification message
      let message = `New episodes of "${subscription.title}" are available:\n`;
      for (const [season, episodes] of Object.entries(seasons)) {
        message += `\nSeason ${season}: ${episodes.length} new episode${episodes.length > 1 ? 's' : ''}`;
        if (episodes.length <= 3) {
          message += ` (Episode${episodes.length > 1 ? 's' : ''} ${episodes.join(', ')})`;
        }
      }

      // Send notification
      const user = await client.users.fetch(userId);
      await user.send(message);

      // Update last notified episode/season
      await supabase
        .from('subscriptions')
        .update({
          last_notified_season: Math.max(...Object.keys(seasons).map(Number)),
          last_notified_episode: Math.max(...notifications.episodes.map(e => e.episode))
        })
        .eq('id', subscription.id);

      // Clear the notifications
      episodeNotifications.delete(`${userId}_${showId}`);
    } catch (error) {
      console.error('Error sending batched notification:', error);
    }
  };

  app.post('/webhook', async (req, res) => {
    try {
      const event = req.body;

      // Validate webhook payload
      if (!event || !event.event || !event.Metadata) {
        return res.status(400).json({ error: 'Invalid webhook payload' });
      }

      // Handle media added event
      if (event.event === 'library.new') {
        const mediaId = event.Metadata.guid.match(/\/(\d+)\?/)?.[1];
        if (!mediaId) {
          return res.status(400).json({ error: 'Invalid media ID' });
        }

        const isEpisode = event.Metadata.type === 'episode';
        
        // Find subscriptions for this media
        const { data: subscriptions, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('tmdb_id', isEpisode ? event.Metadata.grandparentRatingKey : mediaId);

        if (subError) {
          console.error('Error fetching subscriptions:', subError);
          return res.status(500).json({ error: 'Database error' });
        }

        if (!subscriptions?.length) {
          return res.sendStatus(200);
        }

        for (const sub of subscriptions) {
          try {
            if (isEpisode && sub.episode_subscription) {
              // Batch episode notifications
              const key = `${sub.user_id}_${sub.tmdb_id}`;
              const notification = episodeNotifications.get(key) || { episodes: [], timer: null };
              
              notification.episodes.push({
                season: event.Metadata.parentIndex,
                episode: event.Metadata.index
              });

              // Clear existing timer
              if (notification.timer) {
                clearTimeout(notification.timer);
              }

              // Set new timer for 5 minutes
              notification.timer = setTimeout(() => {
                sendBatchedNotification(sub.user_id, sub.tmdb_id);
              }, 5 * 60 * 1000);

              episodeNotifications.set(key, notification);
            } else if (!sub.episode_subscription) {
              // Regular media notification
              const user = await client.users.fetch(sub.user_id);
              await user.send(`${sub.title} is now available on Plex!`);

              // Remove non-episode subscription after notification
              await supabase
                .from('subscriptions')
                .delete()
                .eq('id', sub.id);
            }
          } catch (error) {
            console.error('Error processing subscription:', error);
          }
        }
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Catch-all route to serve index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });

  const port = process.env.WEBHOOK_PORT || 5000;
  app.listen(port, () => {
    console.log(`Webhook server listening on port ${port}`);
  });
}