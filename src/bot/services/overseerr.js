import fetch from 'node-fetch';

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

export async function createRequest({ mediaType, mediaId, userId }) {
  try {
    console.log(`Creating Overseerr request for media ${mediaId} (${mediaType}) for user ${userId}`);
    
    // Base request body
    const requestBody = {
      mediaType,
      mediaId,
      userId: 1, // Use admin ID since Overseerr requires numeric user ID
      is4k: false
    };

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

      Object.assign(requestBody, {
        serverId: serverConfig.id,
        profileId: serverConfig.activeProfileId,
        rootFolder: serverConfig.activeDirectory,
        seasons: [], // Request all seasons by default
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
    console.log('Overseerr response:', response.status, responseText);
    
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