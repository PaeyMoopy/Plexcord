import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', '..', 'data', 'bot.db');

let db;

export function initializeDatabase() {
  try {
    db = new Database(dbPath);
    
    // Create subscriptions table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        media_type TEXT NOT NULL,
        media_id INTEGER NOT NULL,
        media_title TEXT NOT NULL,
        episode_subscription BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, media_id)
      );
    `);

    // Prepare statements for better performance
    const statements = {
      getSubscriptions: db.prepare('SELECT * FROM subscriptions WHERE user_id = ?'),
      addSubscription: db.prepare(`
        INSERT INTO subscriptions (user_id, media_type, media_id, media_title, episode_subscription)
        VALUES (?, ?, ?, ?, ?)
      `),
      removeSubscription: db.prepare('DELETE FROM subscriptions WHERE user_id = ? AND media_id = ?'),
      getSubscription: db.prepare('SELECT * FROM subscriptions WHERE user_id = ? AND media_id = ?'),
      getAllSubscriptionsForMedia: db.prepare('SELECT * FROM subscriptions WHERE media_id = ?')
    };

    return { db, statements };
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Export database operations
export function getSubscriptions(userId) {
  return db.prepare('SELECT * FROM subscriptions WHERE user_id = ?').all(userId);
}

export function addSubscription(userId, mediaType, mediaId, mediaTitle, episodeSubscription) {
  try {
    db.prepare(`
      INSERT INTO subscriptions (user_id, media_type, media_id, media_title, episode_subscription)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, mediaType, mediaId, mediaTitle, episodeSubscription ? 1 : 0);
    return true;
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      // Update episode_subscription if subscription exists
      db.prepare(`
        UPDATE subscriptions 
        SET episode_subscription = ?
        WHERE user_id = ? AND media_id = ?
      `).run(episodeSubscription ? 1 : 0, userId, mediaId);
      return true;
    }
    throw error;
  }
}

export function removeSubscription(userId, mediaId) {
  const result = db.prepare('DELETE FROM subscriptions WHERE user_id = ? AND media_id = ?')
    .run(userId, mediaId);
  return result.changes > 0;
}

export function getSubscription(userId, mediaId) {
  return db.prepare('SELECT * FROM subscriptions WHERE user_id = ? AND media_id = ?')
    .get(userId, mediaId);
}

export function getAllSubscriptionsForMedia(mediaId) {
  return db.prepare('SELECT * FROM subscriptions WHERE media_id = ?').all(mediaId);
}
