const { MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.js');

module.exports = {
  name: "unlock",
  UserPerms: ['MANAGE_CHANNELS'],
  BotPerms: ['MANAGE_CHANNELS', 'EMBED_LINKS'],
  run: async function (client, message, args) {

    function getChannel(message, args) {
      return (
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.channel
      );
    }

    const channel = getChannel(message, args);

    if (channel.manageable && channel.type === 'GUILD_TEXT') {
      channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true,
        reason: `${message.author.tag} (${message.author.id})`,
      });

      let msg = await message.channel.send({ content: `${emoji.util.tick} | ${channel} has been successfully unlocked for all users.` });
      setTimeout(() => {
        message.delete()
        msg.delete().catch(() => { });
      }, 5000);
    } else {
      channel.permissionOverwrites.edit(message.guild.id, {
        CONNECT: true,
        reason: `${message.author.tag} (${message.author.id})`,
      });

      let msg = await message.channel.send({ content: `${emoji.util.tick} | ${channel} has been successfully unlocked for all users.` });
      setTimeout(() => {
        message.delete()
        msg.delete().catch(() => { });
      }, 5000);
    }
  },
};
