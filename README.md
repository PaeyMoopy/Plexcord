# Discord Media Bot

A Discord bot for managing media requests and subscriptions with Plex integration.

## Deployment Instructions

1. Clone the repository
2. Run the setup script:
   ```bash
   npm run setup
   ```
3. Edit the `.env` file with your credentials:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `DISCORD_TOKEN`: Your Discord bot token
   - `OVERSEERR_URL`: Your Overseerr instance URL
   - `OVERSEERR_API_KEY`: Your Overseerr API key
   - `TMDB_API_KEY`: Your TMDB API key
   - `TAUTULLI_URL`: Your Tautulli instance URL
   - `TAUTULLI_API_KEY`: Your Tautulli API key
   - `WEBHOOK_PORT`: Port for the webhook server (default: 5000)

4. Start the bot:
   ```bash
   # Development
   npm run dev:all

   # Production with PM2
   npm run start:pm2
   ```

## Features

- Request movies and TV shows
- Subscribe to media releases
- Get notifications for new episodes
- Web interface for settings management
- Plex webhook integration

## Commands

- `!request [title]`: Search and request media
- `!subscribe [title] [-e]`: Subscribe to media releases (-e for episode notifications)
- `!list`: View your subscriptions
- `!unsubscribe`: Remove a subscription