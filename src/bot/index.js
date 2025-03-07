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
  ]
});

client.once(Events.ClientReady, () => {
  console.log('Discord bot is ready!');
  setupWebhookServer();
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const command = args[0].toLowerCase();

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
});

client.login(process.env.DISCORD_TOKEN);

export { client };