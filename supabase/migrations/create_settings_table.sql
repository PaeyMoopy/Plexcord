CREATE TABLE IF NOT EXISTS public.settings (
    id SERIAL PRIMARY KEY,
    discord_token TEXT,
    overseerr_url TEXT,
    overseerr_api_key TEXT,
    tmdb_api_key TEXT,
    max_results INTEGER DEFAULT 5,
    allowed_channel_id TEXT
);
