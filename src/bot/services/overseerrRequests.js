import fetch from 'node-fetch';
import { client } from '../index.js';
import { getDiscordId } from './overseerr.js';
import { EmbedBuilder } from 'discord.js';

// Utility functions to get environment variables when needed
function getOverseerrUrl() {
  const url = process.env.OVERSEERR_URL?.trim();
  if (!url) {
    console.error('OVERSEERR_URL is empty or undefined! Check your .env file.');
  }
  return url;
}

function getOverseerrApiKey() {
  const key = process.env.OVERSEERR_API_KEY?.trim();
  if (!key) {
    console.error('OVERSEERR_API_KEY is empty or undefined! Check your .env file.');
  }
  return key;
}

// Keep track of the last request ID we've processed
let lastProcessedRequestId = 0;

async function getRequests() {
  try {
    console.log('[Overseerr Requests] Fetching recent requests from Overseerr...');
    const url = getOverseerrUrl();
    const apiKey = getOverseerrApiKey();
    
    console.log(`[Overseerr Requests] Using URL: ${url}/api/v1/request?take=20&skip=0&sort=added`);
    
    const response = await fetch(
      `${url}/api/v1/request?take=20&skip=0&sort=added`,
      {
        headers: {
          'X-Api-Key': apiKey
        }
      }
    );

    if (!response.ok) {
      console.error(`[Overseerr Requests] API Error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch requests: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[Overseerr Requests] Successfully fetched ${data.results.length} recent requests`);
    return data.results;
  } catch (error) {
    console.error('[Overseerr Requests] Error fetching Overseerr requests:', error);
    return [];
  }
}

async function notifyUser(request) {
  try {
    console.log(`[Overseerr Requests] Processing notification for request ID: ${request.id}, media: ${request.media.title || request.media.name}`);
    
    // Get the Discord user ID from our mapping
    console.log(`[Overseerr Requests] Looking up Discord ID for Overseerr user ID: ${request.requestedBy.id}`);
    const discordUserId = getDiscordId(request.requestedBy.id.toString());
    
    if (!discordUserId) {
      console.log(`[Overseerr Requests] No Discord user mapping found for Overseerr user ID: ${request.requestedBy.id}`);
      return;
    }

    console.log(`[Overseerr Requests] Found Discord user ID: ${discordUserId}, preparing notification`);
    
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

    if (request.media.posterPath) {
      embed.setThumbnail(`https://image.tmdb.org/t/p/w200${request.media.posterPath}`);
    }

    // Try to send a DM to the user
    try {
      console.log(`[Overseerr Requests] Attempting to send DM to Discord user: ${discordUserId}`);
      const user = await client.users.fetch(discordUserId);
      await user.send({ embeds: [embed] });
      console.log(`[Overseerr Requests] Successfully sent notification to Discord user: ${discordUserId}`);
    } catch (error) {
      console.error(`[Overseerr Requests] Failed to send notification to Discord user: ${discordUserId}`, error);
    }
  } catch (error) {
    console.error('[Overseerr Requests] Error in notifyUser:', error);
  }
}

async function checkNewRequests() {
  try {
    console.log('[Overseerr Requests] Starting check for new requests...');
    const requests = await getRequests();
    
    if (requests.length === 0) {
      console.log('[Overseerr Requests] No requests found');
      return;
    }
    
    console.log(`[Overseerr Requests] Found ${requests.length} requests, last processed ID: ${lastProcessedRequestId}`);
    
    // Sort by ID (ascending) to process in order they were created
    const sortedRequests = [...requests].sort((a, b) => a.id - b.id);
    
    // Find the newest request we haven't processed yet
    for (const request of sortedRequests) {
      if (request.id > lastProcessedRequestId) {
        console.log(`[Overseerr Requests] Found new request ID: ${request.id} (${request.media.title || request.media.name})`);
        
        await notifyUser(request);
        lastProcessedRequestId = request.id;
        console.log(`[Overseerr Requests] Updated lastProcessedRequestId to: ${lastProcessedRequestId}`);
      }
    }
  } catch (error) {
    console.error('[Overseerr Requests] Error checking for new requests:', error);
  }
}

// Start the periodic check
export function startRequestChecking() {
  console.log('[Overseerr Requests] Initializing request checking service...');
  
  // Run immediately on startup
  checkNewRequests();
  
  // Then check periodically (every 30 seconds)
  const intervalMinutes = 0.5;
  console.log(`[Overseerr Requests] Setting up periodic check every ${intervalMinutes} minutes`);
  
  setInterval(checkNewRequests, intervalMinutes * 60 * 1000);
}
