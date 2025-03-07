/*
  # Create subscriptions table

  1. New Tables
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (text, not null) - Discord user ID
      - `tmdb_id` (integer, not null) - TMDB ID of the media
      - `media_type` (text, not null) - Type of media (movie/tv)
      - `title` (text, not null) - Title of the media
      - `created_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on `subscriptions` table
    - Add policy for users to read their own subscriptions
    - Add policy for users to create their own subscriptions
    - Add policy for users to delete their own subscriptions
*/

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own subscriptions"
  ON subscriptions
  FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create own subscriptions"
  ON subscriptions
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own subscriptions"
  ON subscriptions
  FOR DELETE
  USING (auth.uid()::text = user_id);