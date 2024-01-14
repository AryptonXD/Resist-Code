const { MessageEmbed } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'clear',
  aliases: ['c'],
  UserPerms: ['ManageMessages'],
  BotPerms: ['ManageMessages', 'EmbedLinks'],
  run: async (client, message, args) => {

    const list = args[0];
    let prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const arypton = await client.users.fetch(owner);

    const guide = new MessageEmbed()
      .setColor(client.color)
      .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
      .addFields(
        {
          name: `${emoji.util.arrow}` + prefix + "clear bots",
          value: "Delete the bots' messages in the channel."
        },
        {
          name: `${emoji.util.arrow}` + prefix + "clear humans",
          value: "Delete the humans' messages in the channel."
        },
        {
          name: `${emoji.util.arrow}` + prefix + "clear embeds",
          value: "Delete the embeds' messages in the channel."
        },
        {
          name: `${emoji.util.arrow}` + prefix + "clear files",
          value: "Delete the files' messages in the channel."
        },
        {
          name: `${emoji.util.arrow}` + prefix + "clear mentions",
          value: "Delete the mentions' messages in the channel."
        },
        {
          name: `${emoji.util.arrow}` + prefix + "clear pins",
          value: "Delete the pins' messages in the channel."
        }
      )
      .setFooter({ text: `Thanks For Selecting ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

    if (!list) {
      return message.channel.send({ embeds: [guide] });
    }

    const clearMessages = async (filter) => {
      const messages = await message.channel.messages.fetch({ limit: 30 });
      const data = messages.filter(filter).map(m => m);

      await message.delete();
      await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
        const successEmbed = new MessageEmbed()
          .setColor(client.color)
          .setAuthor(client.user.tag, client.user.displayAvatarURL())
          .setDescription(`${emoji.util.tick} | Cleared ${m.size}/${data.length} messages!`);
        const successMessage = await message.channel.send({ embeds: [successEmbed] });

        setTimeout(() => {
          successMessage.delete();
        }, 5000);
      });
    };

    switch (list) {
      case 'bots':
        return clearMessages(ms => ms.author.bot && !ms.pinned);
      case 'humans':
        return clearMessages(ms => !ms.author.bot && !ms.pinned);
      case 'embeds':
        return clearMessages(ms => ms.embeds.length && !ms.pinned);
      case 'files':
        return clearMessages(ms => ms.attachments.first() && !ms.pinned);
      case 'mentions':
        return clearMessages(ms => (ms.mentions.users.first() || ms.mentions.members.first() || ms.mentions.channels.first() || ms.mentions.roles.first()) && !ms.pinned);
      case 'pins':
        return clearMessages(ms => ms.pinned);
      default:
        return message.channel.send({ embeds: [guide] });
    }
  },
};
