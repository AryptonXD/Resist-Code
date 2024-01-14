const { MessageEmbed } = require("discord.js");
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

const PREFIX_LIMIT = 3;

async function fetchAryptonUser(client) {
  try {
    return await client.users.fetch(owner);
  } catch (error) {
    console.error("Error fetching arypton user:", error);
    return null;
  }
}

function createPrefixEmbed(client) {
  return new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .addFields({ name: "Server Settings", value: `${emoji.util.cross} | Provide me a prefix to set for this server.` });
}

function createNonLatestEmbed(client) {
  return new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .addFields({ name: "Server Settings", value: `${emoji.util.cross} | Please choose a smaller prefix. (Length can be max 2 characters).` });
}

function createLatestEmbed(client, newPrefix, arypton) {
  return new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .addFields({ name: "Server Settings", value: `${emoji.util.tick} | The new prefix is now set to **${newPrefix}** Ping me if you ever forget it.` })
    .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);
}

async function setPrefix(client, guildId, newPrefix) {
  try {
    await client.db8.set(`${guildId}_prefix`, newPrefix);
  } catch (error) {
    console.error("Error setting prefix in the database:", error);
  }
}

module.exports = {
  name: 'prefix',
  aliases: ['customprefix'],
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS'],
  run: async (client, message, args) => {
    try {
      const member = await message.guild.members.fetch(message.author);

      const newPrefix = args[0];

      if (!newPrefix) {
        const prefix = createPrefixEmbed(client);
        return message.channel.send({ embeds: [prefix] });
      }

      if (newPrefix.length >= PREFIX_LIMIT) {
        const nonlatest = createNonLatestEmbed(client);
        return message.channel.send({ embeds: [nonlatest] });
      }

      await setPrefix(client, message.guild.id, newPrefix);

      const arypton = await fetchAryptonUser(client);
      const latest = createLatestEmbed(client, newPrefix, arypton);
      return message.channel.send({ embeds: [latest] });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};
