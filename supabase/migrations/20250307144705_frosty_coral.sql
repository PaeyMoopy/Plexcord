/*
  # Add episode subscription support

  1. Changes
    - Add `episode_subscription` column to subscriptions table
    - Add `last_notified_episode` column to track latest episode notification
    - Add `last_notified_season` column to track latest season notification

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS episode_subscription BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_notified_episode INTEGER DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_notified_season INTEGER DEFAULT NULL;