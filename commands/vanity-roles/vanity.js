const { MessageEmbed } = require('discord.js');
const { ownerIDS } = require('../../owner.json');
const Settings = require('../../settings.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: "vanity",
  aliases: ['vr'],
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS', 'MANAGE_ROLES'],
  run: async (client, message, args) => {
    const [command, subCommand, ...subArgs] = args;

    switch (command) {
      case undefined:
        return sendHelpEmbed(client, message);

      case "set":
        switch (subCommand) {
          case "vanity":
            return setVanityURL(client, message, subArgs);

          case "role":
            return setVanityRole(client, message, subArgs);

          case "channel":
            return setVanityChannel(client, message, subArgs);

          default:
            break;
        }
        break;

      case "config":
        return sendConfigEmbed(client, message);

      case "reset":
        return resetVanitySettings(client, message);

      default:
        break;
    }
  },
};

async function sendHelpEmbed(client, message) {
  const arypton = await client.users.fetch(owner);
  const helpEmbed = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.color)
    .addField(`${emoji.util.arrow} \`vanity config\``, `Shows vanity role settings for the server.`)
    .addField(`${emoji.util.arrow} \`vanity guide\``, `Shows the guide for vanity role settings.`)
    .addField(`${emoji.util.arrow} \`vanity set role <role>\``, `Setups vanity role settings for the server.`)
    .addField(`${emoji.util.arrow} \`vanity set vanity <vanity>\``, `Setups vanity role link settings for the server.`)
    .addField(`${emoji.util.arrow} \`vanity set channel <channel>\``, `Setups vanity role settings for the server.`)
    .addField(`${emoji.util.arrow} \`vanity reset\``, `Resets vanity role for the server.`)
    .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

  return message.channel.send({ embeds: [helpEmbed] });
}

async function setVanityURL(client, message, subArgs) {
  if (!subArgs[0]) {
    const vanityNoEmbed = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({ name: `Vanity Settings`, value: `Provide me a vanity URL to set for this server.` });
    return message.channel.send({ embeds: [vanityNoEmbed] });
  }

  await client.db6.set(`vanityurl_${message.guild.id}.Vanity`, subArgs[0]);

  const vanitySuccessEmbed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .addFields({ name: `Vanity Settings`, value: `Vanity URL has been set to .gg/${subArgs[0]}.` });

  return message.channel.send({ embeds: [vanitySuccessEmbed] });
}

async function setVanityRole(client, message, subArgs) {
  const roleMention = message.mentions.roles.first();
  const roleID = subArgs[0];
  const role = roleMention || message.guild.roles.cache.get(roleID);

  if (!role) {
    const roleMissingEmbed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription('Please mention a role or provide a valid role ID.')
      .setColor(client.color);
    return message.channel.send({ embeds: [roleMissingEmbed] });
  }

  if (role.permissions.has("ADMINISTRATOR")) {
    const adminRoleEmbed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription('The ADMINISTRATOR role cannot be selected.')
      .setColor(client.color);
    return message.channel.send({ embeds: [adminRoleEmbed] });
  }

  await client.db6.set(`vanityrole_${message.guild.id}.Role`, role.id);

  const roleSuccessEmbed = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`The vanity role has been set to ${role}.`)
    .setColor(client.color);

  return message.channel.send({ embeds: [roleSuccessEmbed] });
}

async function setVanityChannel(client, message, subArgs) {
  const channelMention = message.mentions.channels.first();
  const channelID = subArgs[0];
  const channel = channelMention || message.guild.channels.cache.get(channelID);

  if (!channel) {
    const channelMissingEmbed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription('Please mention a channel or provide a valid channel ID.')
      .setColor(client.color);
    return message.channel.send({ embeds: [channelMissingEmbed] });
  }

  await client.db6.set(`vanitych_${message.guild.id}.Channel`, channel.id);

  const channelSuccessEmbed = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`The vanity channel has been set to ${channel}.`)
    .setColor(client.color);

  return message.channel.send({ embeds: [channelSuccessEmbed] });
}

async function sendConfigEmbed(client, message) {
  const vanityRole = await client.db6.get(`vanityrole_${message.guild.id}.Role`) || "Not set";
  const vanityURL = await client.db6.get(`vanityurl_${message.guild.id}.Vanity`) || "Not set";
  const vanityChannelID = await client.db6.get(`vanitych_${message.guild.id}.Channel`) || "Not set";
  const vanityChannel = vanityChannelID !== "Not set" ? `<#${vanityChannelID}>` : "Not set";
  const arypton = await client.users.fetch(owner);

  const configEmbed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle('Vanity Role Config')
    .addField(`${emoji.util.arrow} Vanity Role:`, vanityRole === 'Not set' ? '`Not set`' : `<@&${vanityRole}>`)
    .addField(`${emoji.util.arrow} Vanity URL:`, vanityURL === 'Not set' ? '`Not set`' : `.gg/${vanityURL}`)
    .addField(`${emoji.util.arrow} Vanity Channel:`, vanityChannel)
    .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

  return message.channel.send({ embeds: [configEmbed] });
}

async function resetVanitySettings(client, message) {
  const promises = [
    client.db6.delete(`vanityrole_${message.guild.id}.Role`),
    client.db6.delete(`vanityurl_${message.guild.id}.Vanity`),
    client.db6.delete(`vanitych_${message.guild.id}.Channel`)
  ];

  try {
    await Promise.all(promises);

    const resetEmbed = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription("All the setup of vanity role has been reset.");

    return message.channel.send({ embeds: [resetEmbed] });
  } catch (error) {
    console.error(error);

    const errorEmbed = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription("An error occurred while resetting the vanity role settings.");

    return message.channel.send({ embeds: [errorEmbed] });
  }
}
