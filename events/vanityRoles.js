/*const { MessageEmbed } = require('discord.js');
const client = require('../index.js');
const { WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({
  id: '1128671043536568380',
  token: 'zbed8vBvPvG3xs8h3pvBweVZXc0Hh25BN1UAXhuM5LoW_o_hd2XgWLqH-3-ciGwaKw3m'
});

let globalCooldown = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleRateLimit() {
  if (globalCooldown) {
    await sleep(5000);
  }
  globalCooldown = false;
}

client.on('presenceUpdate', handlePresenceUpdate);

async function handlePresenceUpdate(oldPresence, newPresence) {
  const guildId = newPresence.guild.id;
  const [vanityRole, vanityURL, vanityChannel] = await Promise.all([
    client.db6.get(`vanityrole_${guildId}.Role`),
    client.db6.get(`vanityurl_${guildId}.Vanity`),
    client.db6.get(`vanitych_${guildId}.Channel`)
  ]);

  if (!vanityRole || !vanityURL || !vanityChannel) {
    return;
  }

  const channel = newPresence.guild.channels.cache.get(vanityChannel);
  const role = newPresence.guild.roles.cache.get(vanityRole);
  const member = newPresence.member;

  if (!newPresence.activities || newPresence.activities.length === 0) {
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role, 'Vanity Roles System');
      channel.send({ embeds: [createRemovedEmbed(member.user.tag, role)] });
    }
    return;
  }

  const status = newPresence.activities.map(a => a.state).filter(Boolean);

  if (status.length === 0) {
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role, 'Vanity Roles System');
      channel.send({ embeds: [createRemovedEmbed(member.user.tag, role)] });
    }
    return;
  }

  if (typeof vanityURL !== 'string') {
    return;
  }

  const botMember = newPresence.guild.me;
  const requiredPermissions = ['MANAGE_ROLES', 'SEND_MESSAGES'];
  const missingPermissions = [];
  requiredPermissions.forEach(permission => {
    if (!botMember.permissions.has(permission)) {
      missingPermissions.push(permission);
    }
  });

  if (missingPermissions.length > 0) {
    console.error(`Bot is missing the following required permissions: ${missingPermissions.join(', ')}`);
    return;
  }

  const vanityURLPrefix = '.gg/';
  const lowercaseVanityURL = vanityURLPrefix + vanityURL.toLowerCase();
  const lowercaseStatus = status.map(s => s.toLowerCase());

  const vanityURLMatch = lowercaseStatus.some(s => s.includes(lowercaseVanityURL));

  if (vanityURLMatch) {
    if (!member.roles.cache.has(role.id)) {
      await member.roles.add(role, 'Vanity Roles System');
      channel.send({ embeds: [createAddedEmbed(member.user.tag, role)] });
    }
  } else {
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role, 'Vanity Roles System');
      channel.send({ embeds: [createRemovedEmbed(member.user.tag, role)] });
    }
  }

  if (globalCooldown) {
    await handleRateLimit();
  }
  globalCooldown = true;
}

function createAddedEmbed(username, role) {
  const embed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .addField('Staff Added By Vanity System', `\`${username}\` added the status and obtained the role ${role}`);
  return embed;
}

function createRemovedEmbed(username, role) {
  const embed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .addField('Staff Removed By Vanity System', `\`${username}\` removed the status and lost the role ${role}`);
  return embed;
}

module.exports = {
  handlePresenceUpdate
};*/
