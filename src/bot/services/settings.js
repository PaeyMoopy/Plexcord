import { supabase } from './supabase.js';

export async function loadSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .single();

  if (error) {
    throw new Error('Failed to load settings');
  }

  if (!data) {
    throw new Error('No settings found');
  }

  // Update process.env with settings
  process.env.DISCORD_TOKEN = data.discord_token;
  process.env.OVERSEERR_URL = data.overseerr_url;
  process.env.OVERSEERR_API_KEY = data.overseerr_api_key;
  process.env.TMDB_API_KEY = data.tmdb_api_key;
  process.env.TAUTULLI_URL = data.tautulli_url;
  process.env.TAUTULLI_API_KEY = data.tautulli_api_key;

  return data;
}