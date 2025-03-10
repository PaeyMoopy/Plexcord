// Map of Overseerr user IDs to Discord user IDs
// Parse user mapping from environment variable
// Format in .env: OVERSEERR_USER_MAP={"overseerr_id":"discord_id","6":"265316362900078592"}
const userMap = process.env.OVERSEERR_USER_MAP ? 
  JSON.parse(process.env.OVERSEERR_USER_MAP) : 
  {};

// Create reverse mapping (Discord ID -> Overseerr ID)
const reverseUserMap = {};
for (const [overseerId, discordId] of Object.entries(userMap)) {
  reverseUserMap[discordId] = overseerId;
}

// Get Discord ID from Overseerr ID (for notifications)
export function getDiscordId(overseerId) {
  return userMap[overseerId];
}

// Get Overseerr ID from Discord ID (for requests)
export function getOverseerId(discordId) {
  return reverseUserMap[discordId] || "6"; // Fallback to ID 6 if no mapping exists
}

export { userMap };
