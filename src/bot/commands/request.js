import { searchTMDB, checkOverseerr } from '../services/tmdb.js';
import { supabase } from '../services/supabase.js';
import { createRequest } from '../services/overseerr.js';
import { EmbedBuilder } from 'discord.js';

export async function handleRequest(message, query) {
  if (!query) {
    await message.reply('Please provide a title to search for!');
    return;
  }

  try {
    // Get max results from settings (default to 5 since localStorage isn't available in Node)
    const maxResults = 5;

    // Search TMDB
    const results = await searchTMDB(query);
    
    if (results.length === 0) {
      await message.reply('No results found!');
      return;
    }

    // Take first N results based on settings
    const options = results.slice(0, maxResults);
    
    // Create embeds for each result
    const embeds = options.map((result, index) => {
      return new EmbedBuilder()
        .setTitle(`${index + 1}. ${result.title || result.name}`)
        .setDescription(`Release Date: ${result.release_date || result.first_air_date}\nOverview: ${result.overview}`)
        .setImage(`https://image.tmdb.org/t/p/w500${result.poster_path}`)
        .setFooter({ text: `Type: ${result.media_type}` });
    });

    // Add instructions embed
    const instructionsEmbed = new EmbedBuilder()
      .setTitle('Search Results')
      .setDescription('Please select an option by reacting with the corresponding number:');
    
    embeds.unshift(instructionsEmbed);

    const selectionMsg = await message.reply({ embeds });
    
    // Add number reactions
    for (let i = 0; i < options.length; i++) {
      await selectionMsg.react(`${i + 1}️⃣`);
    }
    await selectionMsg.react('❌');

    // Create reaction collector
    const filter = (reaction, user) => {
      const validReactions = [...Array(options.length)].map((_, i) => `${i + 1}️⃣`).concat('❌');
      return validReactions.includes(reaction.emoji.name) && user.id === message.author.id;
    };

    const collector = selectionMsg.createReactionCollector({ filter, time: 30000 });

    collector.on('collect', async (reaction, user) => {
      try {
        if (reaction.emoji.name === '❌') {
          await message.reply('Request cancelled.');
          collector.stop('cancelled');
          return;
        }

        const index = Number(reaction.emoji.name[0]) - 1;
        const selected = options[index];

        // Stop the collector immediately to prevent double-selections
        collector.stop('selected');

        // Send a processing message
        const processingMsg = await message.reply('Processing your request...');

        try {
          // Check if content exists in Plex
          const exists = await checkOverseerr(selected.id);
          
          if (exists) {
            await processingMsg.edit('This content is already available in Plex!');
            return;
          }

          // Create request in Overseerr
          await createRequest({
            mediaType: selected.media_type,
            mediaId: selected.id,
            userId: user.id
          });

          // Add subscription
          const { error: subError } = await supabase
            .from('subscriptions')
            .insert({
              user_id: user.id,
              tmdb_id: selected.id,
              media_type: selected.media_type,
              title: selected.title || selected.name
            });

          if (subError) {
            console.error('Error adding subscription:', subError);
            throw new Error('Failed to add subscription');
          }

          await processingMsg.edit(`Request for "${selected.title || selected.name}" has been submitted! You'll be notified when it's available.`);
        } catch (error) {
          console.error('Error processing request:', error);
          await processingMsg.edit('An error occurred while processing your request. Please try again later.');
        }
      } catch (error) {
        console.error('Error handling reaction:', error);
        await message.reply('An error occurred while processing your selection. Please try again.');
      }
    });

    collector.on('end', async (_, reason) => {
      if (reason !== 'cancelled' && reason !== 'selected') {
        await message.reply('Request timed out. Please try again.');
      }
      await selectionMsg.reactions.removeAll().catch(console.error);
    });

  } catch (error) {
    console.error('Error handling request:', error);
    await message.reply('An error occurred while processing your request. Please try again later.');
  }
}