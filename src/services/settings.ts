import { supabase } from './supabase';

export interface Settings {
  id: string;
  discord_token: string;
  overseerr_url: string;
  overseerr_api_key: string;
  tmdb_api_key: string;
  tautulli_url: string;
  tautulli_api_key: string;
  max_results: number;
  created_at: string;
  updated_at: string;
}

export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }

  return data;
}

export async function updateSettings(settings: Partial<Settings>): Promise<Settings | null> {
  const { data: existing } = await supabase
    .from('settings')
    .select('id')
    .single();

  if (!existing) {
    // Create new settings
    const { data, error } = await supabase
      .from('settings')
      .insert([settings])
      .select()
      .single();

    if (error) {
      console.error('Error creating settings:', error);
      return null;
    }

    return data;
  }

  // Update existing settings
  const { data, error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', existing.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating settings:', error);
    return null;
  }

  return data;
}