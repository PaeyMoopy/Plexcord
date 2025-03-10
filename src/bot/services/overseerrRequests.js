import fetch from 'node-fetch';
import { client } from '../bot.js';
import { getDiscordId } from './overseerr.js';
import { EmbedBuilder } from 'discord.js';

// Keep track of the last request ID we've processed
let lastProcessedRequestId = 0;

async function getRequests() {
  try {
    const response = await fetch(
      `${process.env.OVERSEERR_URL}/api/v1/request?take=20&skip=0&sort=added`,
      {
        headers: {
          'X-Api-Key': process.env.OVERSEERR_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch requests: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Overseerr requests:', error);
    return [];
  }
}

async function notifyUser(request) {
  try {
    // Get the Discord user ID from our mapping
    const discordUserId = getDiscordId(request.requestedBy.id.toString());
    if (!discordUserId) {
      console.log(`No Discord user mapping found for Overseerr user ID: ${request.requestedBy.id}`);
      return;
    }

    // Create a rich embed for the notification
    const embed = new EmbedBuilder()
      .setTitle('New Content Requested! 🎬')
      .setDescription(
        `Your request for **${request.media.title || request.media.name}** has been submitted to Overseerr.`
      )
      .setColor(0x00ff00)
      .addFields(
        { name: 'Status', value: 'Pending', inline: true },
        { name: 'Type', value: request.type === 'movie' ? 'Movie' : 'TV Show', inline: true }
      );

    // Add poster if available
    if (request.media.posterPath) {
      embed.setThumbnail(`https://image.tmdb.org/t/p/w500${request.media.posterPath}`);
    }

    // Try to send a DM to the user
    try {
      const user = await client.users.fetch(discordUserId);
      await user.send({ embeds: [embed] });
    } catch (error) {
      console.error(`Failed to send DM to user ${discordUserId}:`, error);
    }
  } catch (error) {
    console.error('Error in notifyUser:', error);
  }
}

export async function checkNewRequests() {
  try {
    const requests = await getRequests();
    if (!requests.length) return;

    // If this is our first run, just store the latest request ID and exit
    if (lastProcessedRequestId === 0) {
      lastProcessedRequestId = requests[0].id;
      return;
    }

    // Process new requests (requests are sorted by newest first)
    for (const request of requests) {
      if (request.id <= lastProcessedRequestId) break;
      await notifyUser(request);
    }

    // Update the last processed request ID
    lastProcessedRequestId = requests[0].id;
  } catch (error) {
    console.error('Error checking for new requests:', error);
  }
}

// Start the periodic check
export function startRequestChecking() {
  // Check immediately on startup
  checkNewRequests();
  
  // Then check every 10 minutes
  setInterval(checkNewRequests, 10 * 60 * 1000);
}
