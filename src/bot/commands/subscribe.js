import { searchTMDB } from '../services/tmdb.js';
import { supabase } from '../services/supabase.js';

export async function handleSubscribe(message, query) {
  if (!query) {
    await message.reply('Please provide a title to subscribe to!');
    return;
  }

  try {
    // Check for episode subscription flag
    const isEpisodeSubscription = query.match(/(-e|-episode)(\s|$)/i);
    let searchQuery = query.replace(/(-e|-episode)(\s|$)/i, '').trim();

    // Force TV search if episode subscription
    const results = await searchTMDB(searchQuery, isEpisodeSubscription ? 'tv' : null);
    
    if (results.length === 0) {
      await message.reply('No results found!');
      return;
    }

    // Default to 5 results since localStorage isn't available in Node
    const maxResults = 5;

    // Take first N results
    const options = results.slice(0, maxResults);
    
    // Create embed with options
    const embed = {
      title: 'Search Results',
      description: `Please select what you want to subscribe to${isEpisodeSubscription ? ' (Episode notifications)' : ''}:`,
      fields: options.map((result, index) => ({
        name: `${index + 1}. ${result.title || result.name}`,
        value: `Type: ${result.media_type}\nRelease Date: ${result.release_date || result.first_air_date}\nOverview: ${result.overview}`
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
        await message.reply('Subscription cancelled.');
        collector.stop();
        return;
      }

      const index = Number(reaction.emoji.name[0]) - 1;
      const selected = options[index];

      // Check for existing subscription
      const { data: existingSubscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', message.author.id)
        .eq('tmdb_id', selected.id)
        .single();

      if (existingSubscription) {
        if (existingSubscription.episode_subscription === isEpisodeSubscription) {
          await message.reply('You are already subscribed to this content!');
          collector.stop();
          return;
        }
      }

      // Add subscription
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: message.author.id,
          tmdb_id: selected.id,
          media_type: selected.media_type,
          title: selected.title || selected.name,
          episode_subscription: isEpisodeSubscription
        });

      if (error) {
        console.error('Error adding subscription:', error);
        await message.reply('An error occurred while adding your subscription.');
        return;
      }

      await message.reply(
        isEpisodeSubscription
          ? `You are now subscribed to new episodes of "${selected.name}"!`
          : `You are now subscribed to "${selected.title || selected.name}"!`
      );
      collector.stop();
    });

    collector.on('end', () => {
      selectionMsg.reactions.removeAll();
    });

  } catch (error) {
    console.error('Error handling subscription:', error);
    await message.reply('An error occurred while processing your subscription.');
  }
}