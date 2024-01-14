const { MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.js');

module.exports = {
  name: "lock",
  UserPerms: ['MANAGE_CHANNELS'],
  BotPerms: ['MANAGE_CHANNELS', 'EMBED_LINKS'],
  run: async function (client, message, args) {
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    function createEmbed(client) {
      return new MessageEmbed()
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setFooter(client.user.tag, client.user.displayAvatarURL());
    }

    if (channel.manageable && channel.type === 'GUILD_TEXT') {
      channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: false,
        reason: `${message.author.tag} (${message.author.id})`,
      });

      let msg = await message.channel.send({ content: `${emoji.util.tick} | ${channel} has been securely locked for all users.` });
      setTimeout(() => {
        message.delete()
        msg.delete().catch(() => { });
      }, 5000);
    } else {
      channel.permissionOverwrites.edit(message.guild.id, {
        CONNECT: false,
        reason: `${message.author.tag} (${message.author.id})`,
      });

      const successEmbed = createEmbed(client)
        .setDescription(`${emoji.util.tick} | Successfully locked ${channel} for the @everyone role.`);

      const msg = await message.channel.send({ embeds: [successEmbed] });
      setTimeout(() => {
        message.delete()
        msg.delete().catch(() => { });
      }, 5000);
    }
  },
};
