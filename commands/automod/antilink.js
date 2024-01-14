const { MessageEmbed } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'antilink',
  aliases: ['al', 'antil'],
  voteOnly: true,
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS'],
  VoteOnly: true,
  run: async (client, message, args) => {
    const option = args[0];
    let prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const antilink = await client.db5.get(`${message.guild.id}_antilink`);
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
        const adfbnmo = createEmbed("Antilink Commands", `${prefix}antilink enable\n${prefix}antilink disable`);
        message.channel.send({ embeds: [adfbnmo] });
        break;
      case "enable":
        if (antilink) {
          const eeeee = createEmbed("Antilink Settings", `Ohh uh! looks like your server has already enabled Antilink.\nCurrent Status : ${emoji.util.disabler}${emoji.util.enabled}`);
          message.channel.send({ embeds: [eeeee] });
        } else {
          await client.db5.set(`${message.guild.id}_antilink`, true);
          const eeee = createEmbed("Antilink Settings", `Successfully enabled Antilink settings.\nCurrent Status : ${emoji.util.disabler}${emoji.util.enabled}`);
          message.channel.send({ embeds: [eeee] });
        }
        break;
      case "disable":
        if (!antilink) {
          const ddddd = createEmbed("Antilink Settings", `Ohh uh! looks like your server has already disabled Antilink.\nCurrent Status : ${emoji.util.disabled}${emoji.util.enabler}`);
          message.channel.send({ embeds: [ddddd] });
        } else {
          await client.db5.delete(`${message.guild.id}_antilink`, true);
          const dddd = createEmbed("Antilink Settings", `Successfully disabled Antilink settings.\nCurrent Status : ${emoji.util.disabled}${emoji.util.enabler}`);
          message.channel.send({ embeds: [dddd] });
        }
        break;
      default:
        break;
    }
  }
}
