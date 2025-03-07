import { supabase } from '../services/supabase.js';

export async function handleList(message) {
  try {
    // Get user's subscriptions from database
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
      description: 'Here are all the titles you are subscribed to:',
      fields: subscriptions.map((sub, index) => ({
        name: `${index + 1}. ${sub.title}`,
        value: `Type: ${sub.media_type}`
      }))
    };

    await message.reply({ embeds: [embed] });

  } catch (error) {
    console.error('Error handling list command:', error);
    await message.reply('An error occurred while processing your request.');
  }
}