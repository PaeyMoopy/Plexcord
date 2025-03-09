import { config } from 'dotenv';
import { writeFileSync, existsSync } from 'fs';

async function setup() {
  try {
    console.log('Starting setup...');

    // Check if .env exists
    if (!existsSync('.env')) {
      console.log('Creating .env file...');
      const envContent = `VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DISCORD_TOKEN=your_discord_token
OVERSEERR_URL=your_overseerr_url
OVERSEERR_API_KEY=your_overseerr_api_key
TMDB_API_KEY=your_tmdb_api_key
WEBHOOK_PORT=5000
ALLOWED_CHANNEL_ID=your_allowed_channel_id`;
      
      writeFileSync('.env', envContent);
      console.log('Created .env file template. Please fill in your values and run setup again.');
      process.exit(1);
    }

    console.log('Loading environment variables...');
    const envResult = config();

    if (!envResult.parsed) {
      throw new Error('Failed to parse .env file');
    }

    // Validate required environment variables
    const requiredVars = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'DISCORD_TOKEN',
      'OVERSEERR_URL',
      'OVERSEERR_API_KEY',
      'TMDB_API_KEY',
      'WEBHOOK_PORT',
      'ALLOWED_CHANNEL_ID'
    ];

    const missingVars = requiredVars.filter(varName => !envResult.parsed[varName]);

    if (missingVars.length > 0) {
      console.error('\nMissing required environment variables:');
      missingVars.forEach(varName => {
        console.error(`- ${varName}`);
      });
      console.error('\nPlease add these variables to your .env file and run setup again.');
      process.exit(1);
    }

    // Print current configuration (excluding sensitive values)
    console.log('\nCurrent configuration:');
    console.log('- VITE_SUPABASE_URL:', envResult.parsed.VITE_SUPABASE_URL);
    console.log('- OVERSEERR_URL:', envResult.parsed.OVERSEERR_URL);
    console.log('- WEBHOOK_PORT:', envResult.parsed.WEBHOOK_PORT);
    console.log('- ALLOWED_CHANNEL_ID:', envResult.parsed.ALLOWED_CHANNEL_ID);
    console.log('(Sensitive values like API keys and tokens are not shown)');

    console.log('\nSetup completed successfully! You can now start the bot with:');
    console.log('npm run start:pm2');

  } catch (error) {
    console.error('Setup failed:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

setup();