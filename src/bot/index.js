import { Client, GatewayIntentBits, Events } from 'discord.js';
import { handleRequest } from './commands/request.js';
import { handleSubscribe } from './commands/subscribe.js';
import { handleList } from './commands/list.js';
import { handleUnsubscribe } from './commands/unsubscribe.js';
import { setupWebhookServer } from './webhooks/plex.js';
import { loadSettings } from './services/settings.js';

let client;

async function startBot() {
  try {
    // Load settings from database
    await loadSettings();

    // Validate required settings
    const requiredSettings = [
      'DISCORD_TOKEN',
      'OVERSEERR_URL',
      'OVERSEERR_API_KEY',
      'TMDB_API_KEY',
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY'
    ];

    for (const setting of requiredSettings) {
      if (!process.env[setting]) {
        throw new Error(`Missing required setting: ${setting}`);
      }
    }

    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
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
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Start the bot
startBot();

// Export for use in other modules
export { client };