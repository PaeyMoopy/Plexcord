import fetch from 'node-fetch';

export async function createRequest({ mediaType, mediaId, userId }) {
  const response = await fetch(
    `${process.env.OVERSEERR_URL}/api/v1/request`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.OVERSEERR_API_KEY
      },
      body: JSON.stringify({
        mediaType,
        mediaId,
        userId
      })
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to create request: ${response.statusText}`);
  }
  
  return response.json();
}