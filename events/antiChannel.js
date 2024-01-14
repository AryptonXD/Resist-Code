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

async function handleChannelCreate(channel) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_CREATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const whitelistData = await client.db.get(`${channel.guild.id}_wl`);
    const extraOwner = await client.db11.get(`${channel.guild.id}_eo.extraownerlist`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);

    const antinuke = await client.db.get(`${channel.guild.id}_antichannelcreate`);
    const autorecovery = await client.db.get(`${channel.guild.id}_autorecovery`);

    if (
      isExceptionalCase(executor.id, channel.guild.ownerId) ||
      ownerIDS.includes(executor.id) ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(channel.guild.me, ['ADMINISTRATOR', 'MANAGE_CHANNELS'])) {
      sendWebhookError('Bot lacks necessary permissions for channel create actions.');
      return;
    }

    await handleBan(channel.guild, executor.id, 'Channel Create | Not Whitelisted');

    if (autorecovery === true) {
      await channel.delete();
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleChannelDelete(channel) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_DELETE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const whitelistData = await client.db.get(`${channel.guild.id}_wl`);
    const extraOwner = await client.db11.get(`${channel.guild.id}_eo.extraownerlist`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);

    const antinuke = await client.db.get(`${channel.guild.id}_antichanneldelete`);
    const autorecovery = await client.db.get(`${channel.guild.id}_autorecovery`);

    if (
      isExceptionalCase(executor.id, channel.guild.ownerId) ||
      ownerIDS.includes(executor.id) ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(channel.guild.me, ['ADMINISTRATOR', 'MANAGE_CHANNELS'])) {
      sendWebhookError('Bot lacks necessary permissions for channel delete actions.');
      return;
    }

    await handleBan(channel.guild, executor.id, 'Channel Delete | Not Whitelisted');

    if (autorecovery === true) {
      const clonedChannel = await channel.clone();
      await clonedChannel.setPosition(channel.position);
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleChannelUpdate(oldChannel, newChannel) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await newChannel.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_UPDATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const whitelistData = await client.db.get(`${newChannel.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);

    const antinuke = await client.db.get(`${newChannel.guild.id}_antichannelupdate`);
    const extraOwner = await client.db11.get(`${channel.guild.id}_eo.extraownerlist`);
    const autorecovery = await client.db.get(`${newChannel.guild.id}_autorecovery`);

    if (
      isExceptionalCase(executor.id, oldChannel.guild.ownerId) ||
      ownerIDS.includes(executor.id) ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(newChannel.guild.me, ['ADMINISTRATOR', 'MANAGE_CHANNELS'])) {
      sendWebhookError('Bot lacks necessary permissions for channel update actions.');
      return;
    }

    await handleBan(newChannel.guild, oldChannel.lastMessage.author.id, 'Channel Update | Not Whitelisted');

    if (autorecovery === true) {
      if (newChannel.type === 'text') {
        await handleTextChannelUpdate(oldChannel, newChannel);
      } else if (newChannel.type === 'category') {
        await handleCategoryUpdate(oldChannel, newChannel);
      } else if (newChannel.type === 'voice') {
        await handleVoiceChannelUpdate(oldChannel, newChannel);
      }
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleTextChannelUpdate(oldChannel, newChannel) {
  if (autorecovery === true) {
    await newChannel.edit({
      name: oldChannel.name,
      type: oldChannel.type,
      rawPosition: oldChannel.rawPosition,
      parentId: oldChannel.parentId,
      topic: oldChannel.topic,
      nsfw: oldChannel.nsfw,
      bitrate: oldChannel.bitrate,
      userLimit: oldChannel.userLimit,
      rateLimitPerUser: oldChannel.rateLimitPerUser,
      permissions: oldChannel.permissions,
      position: oldChannel.position,
      slowmode: oldChannel.slowmode
    });
  }
}

async function handleCategoryUpdate(oldChannel, newChannel) {
  if (autorecovery === true) {
    await newChannel.edit({
      name: oldChannel.name,
      type: oldChannel.type,
      rawPosition: oldChannel.rawPosition,
      permissions: oldChannel.permissions,
      position: oldChannel.position
    });
  }
}

async function handleVoiceChannelUpdate(oldChannel, newChannel) {
  if (autorecovery === true) {
    await newChannel.edit({
      name: oldChannel.name,
      type: oldChannel.type,
      rawPosition: oldChannel.rawPosition,
      bitrate: oldChannel.bitrate,
      userLimit: oldChannel.userLimit,
      position: oldChannel.position
    });
  }
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

client.on('channelCreate', handleChannelCreate);
client.on('channelDelete', handleChannelDelete);
client.on('channelUpdate', handleChannelUpdate);
