// Map of Overseerr user IDs to Discord user IDs
// Format in .env: OVERSEERR_USER_MAP={"1":"265316362900078592"}
const userMap = process.env.OVERSEERR_USER_MAP ? 
  JSON.parse(process.env.OVERSEERR_USER_MAP) : 
  {};

// Create Discord ID -> Overseerr ID mapping for requests
const requestMap = {};
Object.entries(userMap).forEach(([overseerId, discordId]) => {
  requestMap[discordId] = parseInt(overseerId);
});

console.log('Loaded mappings:', {
  notifications: userMap,     // Overseerr ID -> Discord ID (for notifications)
  requests: requestMap        // Discord ID -> Overseerr ID (for requests)
});

// Get Overseerr ID from Discord ID (for requests)
export function getOverseerId(discordId) {
  const id = discordId?.toString();
  // Look up the Overseerr ID for this Discord user
  const overseerId = requestMap[id];
  
  console.log('Request mapping:', {
    discordId: id,
    overseerId: overseerId || 6,
    isFallback: !overseerId
  });
  
  return overseerId || 6;
}

// Get Discord ID from Overseerr ID (for notifications)
export function getDiscordId(overseerId) {
  const id = overseerId?.toString();
  // Look up the Discord ID for this Overseerr user
  const discordId = userMap[id];
  
  console.log('Notification mapping:', {
    overseerId: id,
    discordId: discordId || 'none'
  });
  
  return discordId;
}

export { userMap };
