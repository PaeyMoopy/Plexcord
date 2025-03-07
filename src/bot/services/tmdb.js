import fetch from 'node-fetch';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function searchTMDB(query, mediaType = null) {
  // Extract the media type from query if specified in parentheses
  let searchQuery = query;
  let forcedMediaType = mediaType;

  const typeMatch = query.match(/\((movie|tv)\)$/i);
  if (typeMatch) {
    forcedMediaType = typeMatch[1].toLowerCase();
    searchQuery = query.replace(/\((movie|tv)\)$/i, '').trim();
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/search/${forcedMediaType || 'multi'}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`
  );
  const data = await response.json();
  
  if (forcedMediaType) {
    return data.results;
  }
  
  return data.results.filter(result => result.media_type === 'movie' || result.media_type === 'tv');
}

export async function checkOverseerr(tmdbId) {
  const response = await fetch(
    `${process.env.OVERSEERR_URL}/api/v1/search?query=${tmdbId}`,
    {
      headers: {
        'X-Api-Key': process.env.OVERSEERR_API_KEY
      }
    }
  );
  const data = await response.json();
  return data.results.some(result => result.mediaInfo?.status === 'available');
}