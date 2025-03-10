import fetch from 'node-fetch';
import { getOverseerId } from './userMap.js';

async function getRadarrServers() {
  const response = await fetch(
    `${process.env.OVERSEERR_URL}/api/v1/settings/radarr`,
    {
      headers: {
        'X-Api-Key': process.env.OVERSEERR_API_KEY
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Radarr servers: ${response.statusText}`);
  }

  return response.json();
}

async function getSonarrServers() {
  const response = await fetch(
    `${process.env.OVERSEERR_URL}/api/v1/settings/sonarr`,
    {
      headers: {
        'X-Api-Key': process.env.OVERSEERR_API_KEY
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Sonarr servers: ${response.statusText}`);
  }

  return response.json();
}

async function getMediaDetails(mediaType, mediaId) {
  const endpoint = mediaType === 'movie' ? 'movie' : 'tv';
  const response = await fetch(
    `${process.env.OVERSEERR_URL}/api/v1/${endpoint}/${mediaId}`,
    {
      headers: {
        'X-Api-Key': process.env.OVERSEERR_API_KEY
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch media details: ${response.statusText}`);
  }

  return response.json();
}

export async function checkAvailability(mediaType, mediaId) {
  try {
    const details = await getMediaDetails(mediaType, mediaId);
    
    // For TV shows, consider it available if any season is available
    if (mediaType === 'tv') {
      const hasAvailableSeasons = details.mediaInfo?.seasons?.length > 0;
      return {
        isAvailable: hasAvailableSeasons || details.mediaInfo?.status === 5,
        details
      };
    }
    
    return {
      isAvailable: details.mediaInfo?.status === 5,
      details
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
}

export async function createRequest({ mediaType, mediaId, userId }) {
  try {
    // Get the user's Overseerr ID (or fallback to 6)
    const overseerId = getOverseerId(userId);
    console.log('Creating request:', {
      input: {
        mediaType,
        mediaId,
        discordId: userId
      },
      mapped: {
        overseerId,
        type: typeof overseerId
      }
    });
    
    // Base request body
    const requestBody = {
      mediaType,
      mediaId,
      userId: Number(overseerId), // Ensure it's a number for the API
      is4k: false
    };

    console.log('Request body:', requestBody);

    // Get server configurations
    let serverConfig;
    if (mediaType === 'movie') {
      const radarrServers = await getRadarrServers();
      serverConfig = radarrServers.find(server => server.isDefault) || radarrServers[0];
      
      if (!serverConfig) {
        throw new Error('No Radarr server configured');
      }

      Object.assign(requestBody, {
        serverId: serverConfig.id,
        profileId: serverConfig.activeProfileId,
        rootFolder: serverConfig.activeDirectory
      });
    } else if (mediaType === 'tv') {
      const sonarrServers = await getSonarrServers();
      serverConfig = sonarrServers.find(server => server.isDefault) || sonarrServers[0];
      
      if (!serverConfig) {
        throw new Error('No Sonarr server configured');
      }

      // Always request only season 1 for TV shows
      Object.assign(requestBody, {
        serverId: serverConfig.id,
        profileId: serverConfig.activeProfileId,
        rootFolder: serverConfig.activeDirectory,
        seasons: [1],
        languageProfileId: serverConfig.activeLanguageProfileId
      });
    }

    const response = await fetch(
      `${process.env.OVERSEERR_URL}/api/v1/request`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.OVERSEERR_API_KEY
        },
        body: JSON.stringify(requestBody)
      }
    );

    const responseText = await response.text();
    console.log('Overseerr response:', {
      status: response.status,
      body: responseText
    });
    
    if (!response.ok) {
      throw new Error(`Overseerr API error: ${response.status} - ${responseText}`);
    }
    
    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.log('Response was not JSON:', responseText);
      return { success: true }; // Assume success if we got this far
    }
  } catch (error) {
    console.error('Error in createRequest:', error);
    throw error;
  }
}