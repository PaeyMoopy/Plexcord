import fetch from 'node-fetch';

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

function getUserMap() {
  console.log('Raw OVERSEERR_USER_MAP:', process.env.OVERSEERR_USER_MAP);
  
  const rawMap = process.env.OVERSEERR_USER_MAP;
  if (!rawMap) {
    console.error('OVERSEERR_USER_MAP is empty or undefined! Check your .env file.');
    return {};
  }
  
  try {
    const userMap = JSON.parse(rawMap);
    console.log('Loaded Overseerr user map:', {
      raw: rawMap,
      parsed: userMap,
      type: typeof rawMap
    });
    return userMap;
  } catch (error) {
    console.error('Failed to parse OVERSEERR_USER_MAP:', error);
    return {};
  }
}

// Overseerr user mapping helper functions
// Format: {"overseerr_id":"discord_id"}
// Example: {"1":"265316362900078592"}

// Get Overseerr ID from Discord ID (for requests)
function getOverseerId(discordId) {
  const userMap = getUserMap();
  const targetDiscordId = discordId?.toString();
  
  console.log('Looking up Overseerr ID for Discord user:', targetDiscordId);
  console.log('User map entries:', Object.entries(userMap));
  console.log('User map keys:', Object.keys(userMap));
  
  // Find Overseerr ID that maps to this Discord ID
  for (const [overseerId, mappedDiscordId] of Object.entries(userMap)) {
    console.log(`Comparing: stored Discord ID "${mappedDiscordId}" (${typeof mappedDiscordId}) with target "${targetDiscordId}" (${typeof targetDiscordId})`);
    if (mappedDiscordId === targetDiscordId) {
      console.log(`Found mapping: Discord ${targetDiscordId} -> Overseerr ${overseerId}`);
      return Number(overseerId);
    }
  }
  
  console.log('No mapping found, using fallback ID 6');
  return 6;
}

// Get Discord ID from Overseerr ID (for notifications)
export function getDiscordId(overseerId) {
  const userMap = getUserMap();
  const id = overseerId?.toString();
  const discordId = userMap[id];
  
  console.log('Looking up Discord ID:', {
    overseerId: id,
    discordId: discordId || 'none'
  });
  return discordId;
}

async function getRadarrServers() {
  const url = getOverseerrUrl();
  const apiKey = getOverseerrApiKey();
  
  const response = await fetch(
    `${url}/api/v1/settings/radarr`,
    {
      headers: {
        'X-Api-Key': apiKey
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Radarr servers: ${response.statusText}`);
  }

  return response.json();
}

async function getSonarrServers() {
  const url = getOverseerrUrl();
  const apiKey = getOverseerrApiKey();
  
  const response = await fetch(
    `${url}/api/v1/settings/sonarr`,
    {
      headers: {
        'X-Api-Key': apiKey
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Sonarr servers: ${response.statusText}`);
  }

  return response.json();
}

async function getMediaDetails(mediaType, mediaId) {
  const url = getOverseerrUrl();
  const apiKey = getOverseerrApiKey();
  
  const endpoint = mediaType === 'movie' ? 'movie' : 'tv';
  const response = await fetch(
    `${url}/api/v1/${endpoint}/${mediaId}`,
    {
      headers: {
        'X-Api-Key': apiKey
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
      discordId: userId,
      overseerId,
      mediaType,
      mediaId
    });
    
    // Base request body
    const requestBody = {
      mediaType,
      mediaId,
      userId: overseerId,
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

    const url = getOverseerrUrl();
    const apiKey = getOverseerrApiKey();
    
    const response = await fetch(
      `${url}/api/v1/request`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey
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