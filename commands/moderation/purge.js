const { MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.js');

async function bulkDeleteMessages(message, amount, client) {
    const fetchedMessages = await message.channel.messages.fetch({ limit: amount + 1 });
    await message.channel.bulkDelete(fetchedMessages, true);

  message.channel.send({
    embeds: [new MessageEmbed().setColor(client.color).setDescription(`${emoji.util.tick} | Successfully deleted ${amount} messages.`)]
  }).then(m => {
    setTimeout(() => {
      m.delete().catch(() => {});
    }, 3000);
  });
}

module.exports = {
  name: 'purge',
  aliases: ['prune'],
  UserPerms: ['MANAGE_MESSAGES'],
  BotPerms: ['MANAGE_MESSAGES', 'EMBED_LINKS'],
  run: async (client, message, args) => {
    const amount = parseInt(args[0]);

      if (isNaN(amount) || amount <= 0 || amount >= 1001) {
        return message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`${emoji.util.cross} | Please provide a valid number of messages to be deleted (1-1000).`)] });
      }

      await bulkDeleteMessages(message, amount, client);
  }
};
