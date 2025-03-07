import { searchTMDB, checkOverseerr } from '../services/tmdb.js';
import { supabase } from '../services/supabase.js';
import { createRequest } from '../services/overseerr.js';
import { MessageEmbed } from 'discord.js';

export async function handleRequest(message, query) {
  if (!query) {
    await message.reply('Please provide a title to search for!');
    return;
  }

  try {
    // Get max results from settings
    const settings = localStorage.getItem('botSettings');
    const maxResults = settings ? JSON.parse(settings).maxResults || 5 : 5;

    // Search TMDB
    const results = await searchTMDB(query);
    
    if (results.length === 0) {
      await message.reply('No results found!');
      return;
    }

    // Take first N results based on settings
    const options = results.slice(0, maxResults);
    
    // Create embed with options
    const embed = {
      title: 'Search Results',
      description: 'Please select an option by reacting with the corresponding number:',
      fields: options.map((result, index) => ({
        name: `${index + 1}. ${result.title || result.name}`,
        value: `Release Date: ${result.release_date || result.first_air_date}\nOverview: ${result.overview}`
      })),
      image: {
        url: `https://image.tmdb.org/t/p/w500${options[0].poster_path}`
      }
    };

    const selectionMsg = await message.reply({ embeds: [embed] });
    
    // Add number reactions
    for (let i = 0; i < options.length; i++) {
      await selectionMsg.react(`${i + 1}️⃣`);
    }
    await selectionMsg.react('❌');

    // Create reaction collector
    const filter = (reaction, user) => {
      return user.id === message.author.id;
    };

    const collector = selectionMsg.createReactionCollector({ filter, time: 30000 });

    collector.on('collect', async (reaction) => {
      if (reaction.emoji.name === '❌') {
        await message.reply('Request cancelled.');
        collector.stop();
        return;
      }

      const index = Number(reaction.emoji.name[0]) - 1;
      const selected = options[index];

      // Check if content exists in Plex
      const exists = await checkOverseerr(selected.id);
      
      if (exists) {
        await message.reply('This content is already available in Plex!');
        collector.stop();
        return;
      }

      // Create request in Overseerr
      await createRequest({
        mediaType: selected.media_type,
        mediaId: selected.id,
        userId: message.author.id
      });

      // Add subscription
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: message.author.id,
          tmdb_id: selected.id,
          media_type: selected.media_type,
          title: selected.title || selected.name
        });

      if (error) {
        console.error('Error adding subscription:', error);
      }

      await message.reply(`Request for "${selected.title || selected.name}" has been submitted!`);
      collector.stop();
    });

    collector.on('end', () => {
      selectionMsg.reactions.removeAll();
    });

  } catch (error) {
    console.error('Error handling request:', error);
    await message.reply('An error occurred while processing your request.');
  }
}