const { ownerIDS } = require('../owner.json');
const client = require('../index.js');
const { WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({
  id: '1139941868822605935',
  token: 'arxJld-pbY5A_xyJ9Wyndwc1wKSgxuU7kRheSjiN6wZUjbkIVngN_kx2lG0PJif7p_2p'
});

async function handleRateLimit() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
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

async function handleStickerCreate(sticker) {
  try {
    const auditLogs = await sticker.guild.fetchAuditLogs({ limit: 1, type: 'STICKER_CREATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${sticker.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${sticker.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${sticker.guild.id}_antiroleupdate`);
    const autorecovery = await client.db.get(`${sticker.guild.id}_autorecovery`);

    if (
      executor.id === sticker.guild.ownerId ||
      ownerIDS.includes(executor.id) ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    await handleBan(sticker.guild, executor.id, 'Sticker Create | Not Whitelisted');

    if (autorecovery !== true) {
      await sticker.delete().catch(() => {});
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleStickerDelete(sticker) {
  try {
    const auditLogs = await sticker.guild.fetchAuditLogs({ limit: 1, type: 'STICKER_DELETE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const antinuke = await client.db.get(`${sticker.guild.id}_antistickerdelete`);
    const whitelistData = await client.db.get(`${sticker.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${sticker.guild.id}_eo.extraownerlist`);

    if (
      executor.id === sticker.guild.ownerId ||
      ownerIDS.includes(executor.id) ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    await handleBan(sticker.guild, executor.id, 'Sticker Delete | Not Whitelisted');
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleStickerUpdate(oldSticker, newSticker) {
  try {
    const auditLogs = await newSticker.guild.fetchAuditLogs({ limit: 1, type: 'STICKER_UPDATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const antinuke = await client.db.get(`${newSticker.guild.id}_antistickerdelete`);
    const whitelistData = await client.db.get(`${newSticker.guild.id}_wl`);
    const extraOwner = await client.db11.get(`${newSticker.guild.id}_eo.extraownerlist`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const autorecovery = await client.db.get(`${newSticker.guild.id}_autorecovery`);

    if (
      executor.id === sticker.guild.ownerId ||
      ownerIDS.includes(executor.id) ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    await handleBan(newSticker.guild, executor.id, 'Sticker Update | Not Whitelisted');

    if (autorecovery === true) {
      await newSticker.edit({ name: oldSticker.name }).catch(() => {});
    }
  } catch (err) {
    sendWebhookError(err);
  }
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

client.on('stickerCreate', handleStickerCreate);
client.on('stickerDelete', handleStickerDelete);
client.on('stickerUpdate', handleStickerUpdate);
