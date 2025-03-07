import { supabase } from '../services/supabase.js';

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

    // Create embed with subscriptions
    const embed = {
      title: 'Your Subscriptions',
      description: 'Select a subscription to remove:',
      fields: subscriptions.map((sub, index) => ({
        name: `${index + 1}. ${sub.title}`,
        value: `Type: ${sub.media_type}`
      }))
    };

    const selectionMsg = await message.reply({ embeds: [embed] });
    
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