import fetch from 'node-fetch';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function searchTMDB(query, mediaType = null) {
  try {
    // Input validation
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid search query');
    }

    // Extract the media type from query if specified in parentheses
    let searchQuery = query;
    let forcedMediaType = mediaType;

    const typeMatch = query.match(/\((movie|tv)\)$/i);
    if (typeMatch) {
      forcedMediaType = typeMatch[1].toLowerCase();
      searchQuery = query.replace(/\((movie|tv)\)$/i, '').trim();
    }

    // Validate and encode search parameters
    const encodedQuery = encodeURIComponent(searchQuery);
    const endpoint = forcedMediaType ? `search/${forcedMediaType}` : 'search/multi';
    const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodedQuery}&include_adult=false`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results) {
      return [];
    }
    
    if (forcedMediaType) {
      return data.results.map(result => ({
        ...result,
        media_type: forcedMediaType
      }));
    }
    
    return data.results.filter(result => 
      result.media_type === 'movie' || result.media_type === 'tv'
    );
  } catch (error) {
    console.error('Error searching TMDB:', error);
    throw new Error('Failed to search TMDB');
  }
}

export async function checkOverseerr(tmdbId) {
  try {
    if (!tmdbId || typeof tmdbId !== 'number') {
      throw new Error('Invalid TMDB ID');
    }

    const response = await fetch(
      `${process.env.OVERSEERR_URL}/api/v1/search?query=${tmdbId}`,
      {
        headers: {
          'X-Api-Key': process.env.OVERSEERR_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Overseerr API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.some(result => result.mediaInfo?.status === 'available');
  } catch (error) {
    console.error('Error checking Overseerr:', error);
    throw new Error('Failed to check media availability');
  }
}