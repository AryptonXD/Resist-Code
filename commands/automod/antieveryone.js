const { MessageEmbed } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'antieveryone',
  voteOnly: true,
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS'],
  VoteOnly: true,
  run: async (client, message, args) => {
    const option = args[0];
    let prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const antieveryone = await client.db5.get(`${message.guild.id}_antieveryone`);
    const arypton = await client.users.fetch(owner);

    const createEmbed = (title, description) => {
      return new MessageEmbed()
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(description)
        .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));
    };

    switch (option) {
      case undefined:
        const adfbnmo = createEmbed("Antieveryone Commands", `${prefix}antieveryone enable\n${prefix}antieveryone disable`);
        message.channel.send({ embeds: [adfbnmo] });
        break;
      case "enable":
        if (antieveryone) {
          const eeeee = createEmbed("Antieveryone Settings", `Ohh uh! looks like your server has already enabled Antieveryone.\nCurrent Status : ${emoji.util.disabler}${emoji.util.enabled}`);
          message.channel.send({ embeds: [eeeee] });
        } else {
          await client.db5.set(`${message.guild.id}_antieveryone`, true);
          const eeee = createEmbed("Antieveryone Settings", `Successfully enabled Antieveryone settings.\nCurrent Status : ${emoji.util.disabler}${emoji.util.enabled}`);
          message.channel.send({ embeds: [eeee] });
        }
        break;
      case "disable":
        if (!antieveryone) {
          const ddddd = createEmbed("Antieveryone Settings", `Ohh uh! looks like your server has already disabled Antieveryone.\nCurrent Status : ${emoji.util.disabled}${emoji.util.enabler}`);
          message.channel.send({ embeds: [ddddd] });
        } else {
          await client.db5.delete(`${message.guild.id}_antieveryone`, true);
          const dddd = createEmbed("Antieveryone Settings", `Successfully disabled Antieveryone settings.\nCurrent Status : ${emoji.util.disabled}${emoji.util.enabler}`);
          message.channel.send({ embeds: [dddd] });
        }
        break;
      default:
        break;
    }
  }
}
