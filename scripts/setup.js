import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

async function setup() {
  try {
    // Check if .env exists
    if (!existsSync('.env')) {
      console.log('Creating .env file...');
      const envContent = `VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
DISCORD_TOKEN=your_discord_token
OVERSEERR_URL=your_overseerr_url
OVERSEERR_API_KEY=your_overseerr_api_key
TMDB_API_KEY=your_tmdb_api_key
TAUTULLI_URL=your_tautulli_url
TAUTULLI_API_KEY=your_tautulli_api_key
WEBHOOK_PORT=5000
ALLOWED_CHANNEL_ID=your_allowed_channel_id`;
      
      writeFileSync('.env', envContent);
      console.log('Created .env file. Please fill in your values.');
      process.exit(1);
    }

    // Load environment variables
    config();

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials in .env file');
      process.exit(1);
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if settings table exists and has data
    const { data: settings, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (settingsError && !settings) {
      console.log('Initializing settings table...');
      
      const { error: insertError } = await supabase
        .from('settings')
        .insert([{
          discord_token: process.env.DISCORD_TOKEN,
          overseerr_url: process.env.OVERSEERR_URL,
          overseerr_api_key: process.env.OVERSEERR_API_KEY,
          tmdb_api_key: process.env.TMDB_API_KEY,
          tautulli_url: process.env.TAUTULLI_URL,
          tautulli_api_key: process.env.TAUTULLI_API_KEY,
          max_results: 5,
          allowed_channel_id: process.env.ALLOWED_CHANNEL_ID // Add allowed channel ID
        }]);

      if (insertError) {
        console.error('Error initializing settings:', insertError);
        process.exit(1);
      }

      console.log('Settings initialized successfully!');
    } else {
      console.log('Settings table already initialized.');
    }

    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setup();