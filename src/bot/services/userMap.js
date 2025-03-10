// Map of Overseerr user IDs to Discord user IDs
// Parse user mapping from environment variable
// Format in .env: OVERSEERR_USER_MAP={"1":"265316362900078592"}
// Note: Discord IDs must be strings to preserve precision
const userMap = process.env.OVERSEERR_USER_MAP ? 
  JSON.parse(process.env.OVERSEERR_USER_MAP) : 
  {};

// Create reverse mapping (Discord ID -> Overseerr ID)
const reverseUserMap = new Map();
for (const [overseerId, discordId] of Object.entries(userMap)) {
  // Store Overseerr ID as number, Discord ID as string
  reverseUserMap.set(discordId, Number(overseerId));
}

// Get Discord ID from Overseerr ID (for notifications)
export function getDiscordId(overseerId) {
  // Convert Overseerr ID to string for lookup
  return userMap[overseerId.toString()];
}

// Get Overseerr ID from Discord ID (for requests)
export function getOverseerId(discordId) {
  // Ensure Discord ID is a string
  const id = discordId?.toString();
  // Get mapped Overseerr ID (as number) or fallback to 6
  return reverseUserMap.get(id) || 6;
}

export { userMap };
