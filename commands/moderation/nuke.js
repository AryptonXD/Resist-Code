const { MessageButton, MessageActionRow } = require('discord.js');

async function nukeChannel(channel, reason) {
  await channel.clone({ reason });
  await channel.delete({ reason });
}

async function sendConfirmationMessage(channel) {
  const confirmButton = new MessageButton()
    .setCustomId('confirm')
    .setLabel('Confirm')
    .setStyle('SUCCESS');

  const cancelButton = new MessageButton()
    .setCustomId('cancel')
    .setLabel('Cancel')
    .setStyle('DANGER');

  const row = new MessageActionRow().addComponents(confirmButton, cancelButton);

  const confirmationMsg = await channel.send({
    content: 'Are you sure you want to nuke this channel?',
    components: [row],
  });

  return confirmationMsg;
}

module.exports = {
  name: 'nuke',
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['MANAGE_CHANNELS', 'EMBED_LINKS'],
  description: 'Nuke the channel',
  run: async (client, message, args) => {

    const reason = 'Channel Delete Command Used';

    const confirmationMsg = await sendConfirmationMessage(message.channel);

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = confirmationMsg.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'confirm') {
        await nukeChannel(message.channel, reason);
      } else if (interaction.customId === 'cancel') {
        await confirmationMsg.delete();
      }
    });

    collector.on('end', async () => {
      confirmationMsg.edit({ components: [] });
    });
  },
};
