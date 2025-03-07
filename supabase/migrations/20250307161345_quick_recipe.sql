/*
  # Create settings table

  1. New Tables
    - `settings`
      - `id` (uuid, primary key)
      - `discord_token` (text)
      - `overseerr_url` (text)
      - `overseerr_api_key` (text)
      - `tmdb_api_key` (text)
      - `tautulli_url` (text)
      - `tautulli_api_key` (text)
      - `max_results` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `allowed_channel_id` (text)

  2. Security
    - Enable RLS on `settings` table
    - Add policy for authenticated users to read settings
    - Add policy for authenticated users to update settings
*/

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_token text,
  overseerr_url text,
  overseerr_api_key text,
  tmdb_api_key text,
  tautulli_url text,
  tautulli_api_key text,
  max_results integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  allowed_channel_id text
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
  ON settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update settings"
  ON settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE
  ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();