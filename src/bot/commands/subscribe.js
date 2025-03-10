import { searchTMDB } from '../services/tmdb.js';
import { EmbedBuilder } from 'discord.js';
import { addSubscription, getSubscription } from '../services/database.js';

export async function handleSubscribe(message, query) {
  if (!query) {
    await message.reply('Please provide a title to subscribe to!');
    return;
  }

  try {
    // Check for episode subscription flag
    const isEpisodeSubscription = query.toLowerCase().includes('-e') || query.toLowerCase().includes('-episode');
    let searchQuery = query.replace(/(-e|-episode)(\s|$)/i, '').trim();

    // Force TV search if episode subscription
    const results = await searchTMDB(searchQuery, isEpisodeSubscription ? 'tv' : null);
    
    if (results.length === 0) {
      await message.reply('No results found!');
      return;
    }

    // Default to 3 results
    const maxResults = 3;

    // Take first N results
    const options = results.slice(0, maxResults);
    
    // Create embeds for each result
    const embeds = options.map((result, index) => {
      return new EmbedBuilder()
        .setTitle(`${index + 1}. ${result.title || result.name}`)
        .setDescription(
          `Type: ${result.media_type}\n` +
          `Release Date: ${result.release_date || result.first_air_date}\n` +
          `Overview: ${result.overview}`
        )
        .setImage(`https://image.tmdb.org/t/p/w500${result.poster_path}`)
        .setFooter({ text: isEpisodeSubscription ? 'Episode notifications enabled' : 'Release notification only' });
    });

    // Add instructions embed
    const instructionsEmbed = new EmbedBuilder()
      .setTitle('Search Results')
      .setDescription(`Please select what you want to subscribe to${isEpisodeSubscription ? ' (Episode notifications)' : ''}:`);
    
    embeds.unshift(instructionsEmbed);

    const selectionMsg = await message.reply({ embeds });
    
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

      try {
        // Check for existing subscription
        const existingSubscription = getSubscription(message.author.id.toString(), selected.id);

        // Add or update subscription
        await addSubscription(
          message.author.id.toString(),
          selected.media_type,
          selected.id,
          selected.title || selected.name,
          isEpisodeSubscription
        );

        // Send appropriate response
        if (existingSubscription) {
          if (existingSubscription.episode_subscription === isEpisodeSubscription) {
            await message.reply('You are already subscribed to this content!');
          } else {
            await message.reply(
              isEpisodeSubscription
                ? `Updated! You will now receive episode notifications for "${selected.title || selected.name}"!`
                : `Updated! You will now only receive release notifications for "${selected.title || selected.name}"!`
            );
          }
        } else {
          await message.reply(
            isEpisodeSubscription
              ? `You are now subscribed to new episodes of "${selected.name}"!`
              : `You are now subscribed to "${selected.title || selected.name}"!`
          );
        }
      } catch (error) {
        console.error('Error managing subscription:', error);
        await message.reply('An error occurred while managing your subscription.');
      }

      collector.stop();
    });

    collector.on('end', () => {
      selectionMsg.reactions.removeAll().catch(console.error);
    });

  } catch (error) {
    console.error('Error handling subscription:', error);
    await message.reply('An error occurred while processing your subscription.');
  }
}