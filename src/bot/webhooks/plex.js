import express from 'express';
import { supabase } from '../services/supabase.js';
import { client } from '../index.js';

export function setupWebhookServer() {
  const app = express();
  app.use(express.json());

  // Store episode notifications to batch them
  const episodeNotifications = new Map(); // key: userId_showId, value: { episodes: [], timer }

  const sendBatchedNotification = async (userId, showId) => {
    const notifications = episodeNotifications.get(`${userId}_${showId}`);
    if (!notifications) return;

    const { episodes } = notifications;
    if (episodes.length === 0) return;

    // Get show details from subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('tmdb_id', showId)
      .single();

    if (!subscription) return;

    // Group episodes by season
    const seasons = episodes.reduce((acc, ep) => {
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
    try {
      const user = await client.users.fetch(userId);
      await user.send(message);

      // Update last notified episode/season
      await supabase
        .from('subscriptions')
        .update({
          last_notified_season: Math.max(...Object.keys(seasons)),
          last_notified_episode: Math.max(...episodes.map(e => e.episode))
        })
        .eq('id', subscription.id);
    } catch (error) {
      console.error('Error sending notification:', error);
    }

    // Clear the notifications
    episodeNotifications.delete(`${userId}_${showId}`);
  };

  app.post('/webhook', async (req, res) => {
    const event = req.body;

    // Handle media added event
    if (event.event === 'library.new') {
      const mediaId = event.Metadata.guid.match(/\/(\d+)\?/)[1];
      const isEpisode = event.Metadata.type === 'episode';
      
      // Find subscriptions for this media
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('tmdb_id', isEpisode ? event.Metadata.grandparentRatingKey : mediaId);

      if (!subscriptions || subscriptions.length === 0) {
        res.sendStatus(200);
        return;
      }

      for (const sub of subscriptions) {
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
          try {
            const user = await client.users.fetch(sub.user_id);
            await user.send(`${sub.title} is now available on Plex!`);

            // Remove non-episode subscription after notification
            await supabase
              .from('subscriptions')
              .delete()
              .eq('id', sub.id);
          } catch (error) {
            console.error('Error sending notification:', error);
          }
        }
      }
    }

    res.sendStatus(200);
  });

  app.listen(5000, () => {
    console.log('Webhook server listening on port 5000');
  });
}