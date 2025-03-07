import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';
import { handleRequest } from './commands/request.js';
import { handleSubscribe } from './commands/subscribe.js';
import { handleList } from './commands/list.js';
import { handleUnsubscribe } from './commands/unsubscribe.js';
import { setupWebhookServer } from './webhooks/plex.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'DISCORD_TOKEN',
  'OVERSEERR_URL',
  'OVERSEERR_API_KEY',
  'TMDB_API_KEY',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  // Add reconnection options
  failIfNotExists: false,
  retryLimit: 5,
  presence: {
    status: 'online'
  }
});

// Handle connection errors
client.on('error', error => {
  console.error('Discord client error:', error);
  // Attempt to reconnect after a delay
  setTimeout(() => {
    console.log('Attempting to reconnect...');
    client.login(process.env.DISCORD_TOKEN).catch(console.error);
  }, 5000);
});

client.on('disconnect', () => {
  console.log('Discord client disconnected');
  // Attempt to reconnect after a delay
  setTimeout(() => {
    console.log('Attempting to reconnect...');
    client.login(process.env.DISCORD_TOKEN).catch(console.error);
  }, 5000);
});

client.once(Events.ClientReady, () => {
  console.log('Discord bot is ready!');
  setupWebhookServer();
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const command = args[0].toLowerCase();

  try {
    switch (command) {
      case '!request':
        await handleRequest(message, args.slice(1).join(' '));
        break;
      case '!subscribe':
        await handleSubscribe(message, args.slice(1).join(' '));
        break;
      case '!list':
        await handleList(message);
        break;
      case '!unsubscribe':
        await handleUnsubscribe(message);
        break;
    }
  } catch (error) {
    console.error('Error handling command:', error);
    await message.reply('An error occurred while processing your command. Please try again later.')
      .catch(console.error);
  }
});

// Initial login
client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('Failed to login:', error);
  process.exit(1);
});

export { client };