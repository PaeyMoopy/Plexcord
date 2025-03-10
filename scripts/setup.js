import { config } from 'dotenv';
import { writeFileSync, existsSync, mkdirSync, join } from 'fs';
import { fileURLToPath } from 'url';
import { Client, GatewayIntentBits } from 'discord.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function validateDiscordToken(token) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  try {
    await client.login(token);
    await client.destroy(); // Clean shutdown
    return true;
  } catch (error) {
    if (error.code === 'TokenInvalid') {
      console.error('\nERROR: Invalid Discord token. Please check your token and try again.');
      console.error('You can get a new token from the Discord Developer Portal:');
      console.error('https://discord.com/developers/applications\n');
    }
    return false;
  }
}

async function setup() {
  try {
    console.log('Starting setup...');

    // Create data directory
    const dataDir = join(__dirname, '..', 'data');
    if (!existsSync(dataDir)) {
      console.log('Creating data directory...');
      mkdirSync(dataDir);
    }

    // Check if .env exists
    if (!existsSync('.env')) {
      console.log('Creating .env file...');
      const envTemplate = `# Discord Bot Configuration
DISCORD_TOKEN=           # Your Discord bot token
ALLOWED_CHANNEL_ID=      # Channel ID where bot commands are allowed

# Overseerr Configuration
OVERSEERR_URL=          # Your Overseerr instance URL
OVERSEERR_API_KEY=      # Your Overseerr API key
# Map Overseerr web users to Discord users for notifications
# Format: {"overseerr_user_id":"discord_user_id"}
OVERSEERR_USER_MAP=     # e.g., {"1":"123456789"}

# TMDB Configuration
TMDB_API_KEY=           # Your TMDB API key

# Webhook Configuration
WEBHOOK_PORT=5000      # Port for Plex webhook server`;
      
      writeFileSync('.env', envTemplate);
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
      'DISCORD_TOKEN',
      'OVERSEERR_URL',
      'OVERSEERR_API_KEY',
      'TMDB_API_KEY',
      'WEBHOOK_PORT',
      'ALLOWED_CHANNEL_ID',
      'OVERSEERR_USER_MAP'
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

    // Validate Discord token
    console.log('\nValidating Discord token...');
    const isValidToken = await validateDiscordToken(process.env.DISCORD_TOKEN);
    if (!isValidToken) {
      process.exit(1);
    }
    console.log('Discord token is valid!');

    // Validate OVERSEERR_USER_MAP is valid JSON
    try {
      JSON.parse(process.env.OVERSEERR_USER_MAP);
    } catch (error) {
      throw new Error('OVERSEERR_USER_MAP must be a valid JSON string. Format: {"overseerr_id":"discord_id"}');
    }

    console.log('\nSetup completed successfully! You can now start the bot with:');
    console.log('npm run start:pm2');

  } catch (error) {
    console.error('Setup failed:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

setup();