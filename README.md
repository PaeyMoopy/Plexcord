# Discord Media Bot

A Discord bot for managing media requests and subscriptions with Plex integration.

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/PaeyMoopy/Discord-Bot-2.0.git

# 2. Navigate to project directory
cd Discord-Bot-2.0

# 3. Install dependencies
npm install

# 4. Run setup script (this will create .env template)
npm run setup

# 5. Edit .env with your credentials:
#    - DISCORD_TOKEN
#    - OVERSEERR_URL
#    - OVERSEERR_API_KEY
#    - TMDB_API_KEY
#    - ALLOWED_CHANNEL_ID
#    - OVERSEERR_USER_MAP (e.g., {"1":"123456789"})

# 6. Start the bot with PM2
npm run start:pm2

# To view logs
pm2 logs

# To stop the bot
pm2 stop all
```

## Features

- Request movies and TV shows through Discord
- Subscribe to media releases and get notifications
- Receive notifications for Plex webhook events
- Get Discord notifications for Overseerr web requests
- Personalized Overseerr integration with user mapping
- Local SQLite database for easy setup and maintenance

## Setup Instructions

1. Clone the repository
2. Run the setup script:
   ```bash
   npm run setup
   ```
3. Configure your `.env` file with required credentials (see Environment Variables section)
4. Start the bot:
   ```bash
   npm start
   ```

The bot will automatically:
- Create a `data` directory for the SQLite database
- Initialize the database schema on first run
- Handle all database migrations automatically

## Environment Variables

```env
# Discord Bot Configuration
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
WEBHOOK_PORT=5000      # Port for Plex webhook server
```

## Commands

- `!request [title]`: Search and request media
- `!subscribe [title] [-e]`: Subscribe to media releases (-e for episode notifications)
- `!list`: View your subscriptions
- `!unsubscribe`: Remove a subscription
- `!commands`: Show available commands

## User Mapping

The bot supports bi-directional integration with Overseerr:
1. Discord users with Overseerr accounts can make requests using their Overseerr ID
2. Overseerr web users can receive Discord notifications for their requests
3. Users without mappings will still work using a fallback Overseerr ID

Configure mappings in your `.env` file:
```env
OVERSEERR_USER_MAP={"overseerr_id1":"discord_id1","overseerr_id2":"discord_id2"}
```

## Database

The bot uses a local SQLite database stored in `data/bot.db`. This provides:
- Zero configuration required
- Automatic setup and initialization
- Easy backups (just copy the .db file)
- Works offline
- No external dependencies

To backup your data, simply copy the `data/bot.db` file to a safe location.