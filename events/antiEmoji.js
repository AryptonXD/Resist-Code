const { ownerIDS } = require('../owner.json');
const client = require('../index.js');
const { WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({
  id: '1139941868822605935',
  token: 'arxJld-pbY5A_xyJ9Wyndwc1wKSgxuU7kRheSjiN6wZUjbkIVngN_kx2lG0PJif7p_2p'
});

let globalCooldown = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleRateLimit() {
  globalCooldown = true;
  await sleep(5000);
  globalCooldown = false;
}

async function handleBan(guild, userId, reason) {
  if (!hasPermissions(guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
    sendWebhookError('Bot lacks necessary permissions to ban members.');
    return;
  }

  const member = await guild.members.fetch(userId);
  if (!member) return;

  const botMember = guild.me;
  if (member.roles.highest.comparePositionTo(botMember.roles.highest) >= 0) return;

  await guild.members.ban(userId, { reason });
}

async function handleEmojiCreate(emoji) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 1, type: 'EMOJI_CREATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const whitelistData = await client.db.get(`${emoji.guild.id}_wl`);
    const extraOwner = await client.db11.get(`${emoji.guild.id}_eo.extraownerlist`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const antinuke = await client.db.get(`${emoji.guild.id}_antiemojicreate`);
    const autorecovery = await client.db.get(`${emoji.guild.id}_autorecovery`);

    if (
      executor.id === emoji.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(emoji.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for emoji create actions.');
      return;
    }

    await handleBan(emoji.guild, executor.id, 'Emoji Create | Not Whitelisted');

    if (autorecovery === true) {
      await emoji.delete();
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleEmojiDelete(emoji) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 1, type: 'EMOJI_DELETE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const whitelistData = await client.db.get(`${emoji.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${emoji.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${emoji.guild.id}_antiemojidelete`);

    if (
      executor.id === emoji.guild.ownerId ||
      executor.id === client.user.id ||
      ownerIDS.includes(executor.id) ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(emoji.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for emoji delete actions.');
      return;
    }

    await handleBan(emoji.guild, executor.id, 'Emoji Delete | Not Whitelisted');
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleEmojiUpdate(oldEmoji, newEmoji) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await newEmoji.guild.fetchAuditLogs({ limit: 1, type: 'EMOJI_UPDATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const whitelistData = await client.db.get(`${newEmoji.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${newEmoji.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${newEmoji.guild.id}_antiemojiupdate`);
    const autorecovery = await client.db.get(`${newEmoji.guild.id}_autorecovery`);

    if (
      executor.id === newEmoji.guild.ownerId ||
      executor.id === client.user.id ||
      ownerIDS.includes(executor.id) ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(newEmoji.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for emoji update actions.');
      return;
    }

    await handleBan(newEmoji.guild, executor.id, 'Emoji Update | Not Whitelisted');

    if (autorecovery === true) {
      await newEmoji.setName(oldEmoji.name);
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

function isExceptionalCase(executorId, ownerId) {
  return executorId === ownerId || executorId === client.user.id;
}

function hasPermissions(member, permissions) {
  if (member.permissions.has('ADMINISTRATOR')) {
    return true;
  }

  const botPermissions = member.permissions.toArray();
  return permissions.every((perm) => botPermissions.includes(perm));
}

function sendWebhookError(error) {
  webhookClient.send(error).catch(() => {});
}

client.on('emojiCreate', handleEmojiCreate);
client.on('emojiDelete', handleEmojiDelete);
client.on('emojiUpdate', handleEmojiUpdate);
