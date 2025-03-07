import { supabase } from '../services/supabase.js';
import { EmbedBuilder } from 'discord.js';

export async function handleUnsubscribe(message) {
  try {
    // Get user's subscriptions
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', message.author.id);

    if (error) {
      console.error('Error fetching subscriptions:', error);
      await message.reply('An error occurred while fetching your subscriptions.');
      return;
    }

    if (!subscriptions || subscriptions.length === 0) {
      await message.reply('You are not subscribed to any content.');
      return;
    }

    // Create embeds for subscriptions (group by 5 to stay within Discord's limit)
    const embedGroups = [];
    const itemsPerEmbed = 5;
    
    for (let i = 0; i < subscriptions.length; i += itemsPerEmbed) {
      const groupSubscriptions = subscriptions.slice(i, i + itemsPerEmbed);
      const embed = new EmbedBuilder()
        .setTitle(i === 0 ? 'Select a subscription to remove' : 'Subscriptions (continued)')
        .setDescription(groupSubscriptions.map((sub, index) => 
          `${i + index + 1}. **${sub.title}**\n` +
          `Type: ${sub.media_type}\n` +
          `Notifications: ${sub.episode_subscription ? 'Episodes' : 'Release only'}`
        ).join('\n\n'));
      
      embedGroups.push(embed);
    }

    const selectionMsg = await message.reply({ embeds: embedGroups });
    
    // Add number reactions
    for (let i = 0; i < subscriptions.length; i++) {
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
        await message.reply('Unsubscribe cancelled.');
        collector.stop();
        return;
      }

      const index = Number(reaction.emoji.name[0]) - 1;
      const selected = subscriptions[index];

      // Remove subscription from database
      const { error: deleteError } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', selected.id);

      if (deleteError) {
        console.error('Error removing subscription:', deleteError);
        await message.reply('An error occurred while removing your subscription.');
        return;
      }

      await message.reply(`You have been unsubscribed from "${selected.title}"!`);
      collector.stop();
    });

    collector.on('end', () => {
      selectionMsg.reactions.removeAll();
    });

  } catch (error) {
    console.error('Error handling unsubscribe:', error);
    await message.reply('An error occurred while processing your request.');
  }
}