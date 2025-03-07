import fetch from 'node-fetch';

export async function createRequest({ mediaType, mediaId, userId }) {
  try {
    console.log(`Creating Overseerr request for media ${mediaId} (${mediaType}) for user ${userId}`);
    
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
          userId: '1', // Overseerr requires a valid user ID, default to admin
          // Add additional required fields
          is4k: false,
          serverId: 1,
          profileId: 1
        })
      }
    );

    const responseText = await response.text();
    console.log('Overseerr response:', response.status, responseText);
    
    if (!response.ok) {
      throw new Error(`Overseerr API error: ${response.status} - ${responseText}`);
    }
    
    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.log('Response was not JSON:', responseText);
      return { success: true }; // Assume success if we got this far
    }
  } catch (error) {
    console.error('Error in createRequest:', error);
    throw error;
  }
}