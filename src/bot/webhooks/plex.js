import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { client } from '../index.js';
import { searchTMDB } from '../services/tmdb.js';
import { EmbedBuilder } from 'discord.js';
import { getSubscriptionByTitle, updateSubscription, removeSubscription } from '../services/database.js';

export function setupWebhookServer() {
  const app = express();

  // Security middleware
  app.use(helmet());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // Body parser with size limit
  app.use(express.json({ limit: '1mb' }));

  // Store episode notifications to batch them
  const episodeNotifications = new Map(); // key: userId_showId, value: { episodes: [], timer, posterPath }

  const sendBatchedNotification = async (userId, showId) => {
    try {
      const notifications = episodeNotifications.get(`${userId}_${showId}`);
      if (!notifications || !notifications.episodes.length) return;

      // Get show details from subscription
      const subscription = getSubscriptionByTitle(userId.toString(), showId.toString());
      if (!subscription) {
        console.error('No subscription found for:', { userId, showId });
        return;
      }

      // Group episodes by season
      const seasons = notifications.episodes.reduce((acc, ep) => {
        acc[ep.season] = acc[ep.season] || [];
        acc[ep.season].push(ep.episode);
        return acc;
      }, {});

      // Create notification embed
      const embed = new EmbedBuilder()
        .setTitle(`New Episodes Available: ${subscription.media_title}`)
        .setDescription(
          Object.entries(seasons).map(([season, episodes]) =>
            `**Season ${season}**: ${episodes.length} new episode${episodes.length > 1 ? 's' : ''}` +
            (episodes.length <= 3 ? ` (Episode${episodes.length > 1 ? 's' : ''} ${episodes.join(', ')})` : '')
          ).join('\n')
        )
        .setColor(0x00ff00);

      // Add poster if available
      if (notifications.posterPath) {
        embed.setThumbnail(`https://image.tmdb.org/t/p/w500${notifications.posterPath}`);
      }

      // Send notification
      const user = await client.users.fetch(userId);
      await user.send({ embeds: [embed] });

      // Update last notified episode/season
      const success = updateSubscription(
        userId.toString(),
        showId.toString(),
        Math.max(...Object.keys(seasons).map(Number)),
        Math.max(...notifications.episodes.map(e => e.episode))
      );

      if (!success) {
        console.error('Failed to update subscription:', { userId, showId });
      }

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
        const isMovie = event.Metadata.type === 'movie';
        const isEpisode = event.Metadata.type === 'episode';

        if (!isMovie && !isEpisode) {
          return res.sendStatus(200);
        }

        // Get the title based on media type
        const title = isMovie ? 
          event.Metadata.title : 
          event.Metadata.grandparentTitle;

        // Find subscriptions by title and media type
        const subscriptions = getSubscriptionByTitle(title, isMovie ? 'movie' : 'tv');
        if (!subscriptions?.length) {
          return res.sendStatus(200);
        }

        // Search TMDB for poster
        const results = await searchTMDB(title, isMovie ? 'movie' : 'tv');
        const posterPath = results[0]?.poster_path;

        for (const sub of subscriptions) {
          try {
            if (isEpisode && sub.episode_subscription) {
              // Batch episode notifications
              const key = `${sub.user_id}_${sub.media_id}`;
              const notification = episodeNotifications.get(key) || { 
                episodes: [], 
                timer: null,
                posterPath
              };
              
              const seasonNumber = parseInt(event.Metadata.parentIndex, 10);
              const episodeNumber = parseInt(event.Metadata.index, 10);

              if (!isNaN(seasonNumber) && !isNaN(episodeNumber)) {
                notification.episodes.push({
                  season: seasonNumber,
                  episode: episodeNumber
                });

                // Clear existing timer
                if (notification.timer) {
                  clearTimeout(notification.timer);
                }

                // Set new timer for 5 minutes
                notification.timer = setTimeout(() => {
                  sendBatchedNotification(sub.user_id, sub.media_id);
                }, 5 * 60 * 1000);

                episodeNotifications.set(key, notification);
              }
            } else if (!sub.episode_subscription) {
              // Regular media notification (movies or show releases)
              const user = await client.users.fetch(sub.user_id);
              
              const embed = new EmbedBuilder()
                .setTitle('New Content Available! 🎉')
                .setDescription(`**${sub.media_title}** is now available on Plex!`)
                .setColor(0x00ff00);

              if (posterPath) {
                embed.setThumbnail(`https://image.tmdb.org/t/p/w500${posterPath}`);
              }

              await user.send({ embeds: [embed] });

              // Remove non-episode subscription after notification
              const success = removeSubscription(sub.user_id, sub.media_id);
              if (!success) {
                console.error('Error removing subscription:', { userId: sub.user_id, mediaId: sub.media_id });
              }
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

  // Start server
  const port = process.env.WEBHOOK_PORT || 5000;
  app.listen(port, () => {
    console.log(`Webhook server listening on port ${port}`);
  });
}