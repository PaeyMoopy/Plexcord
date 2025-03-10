// Map of Overseerr user IDs to Discord user IDs
// Format in .env: OVERSEERR_USER_MAP={"overseerr_id":"discord_id"}
// Example: {"1":"265316362900078592"}
const userMap = process.env.OVERSEERR_USER_MAP ? 
  JSON.parse(process.env.OVERSEERR_USER_MAP) : 
  {};

console.log('Loaded user map:', userMap);

// Get Overseerr ID from Discord ID (for requests)
export function getOverseerId(discordId) {
  // Convert input to string for comparison
  const targetDiscordId = discordId?.toString();
  
  // Find Overseerr ID by looking through the values
  for (const [overseerId, mappedDiscordId] of Object.entries(userMap)) {
    if (mappedDiscordId === targetDiscordId) {
      // Found a match, return the Overseerr ID as a number
      return Number(overseerId);
    }
  }
  
  // No match found, return fallback ID
  return 6;
}

// Get Discord ID from Overseerr ID (for notifications)
export function getDiscordId(overseerId) {
  // Direct lookup by Overseerr ID
  return userMap[overseerId?.toString()];
}

export { userMap };
