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

async function handleGuildBanAdd(member) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_ADD' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${member.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${member.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${member.guild.id}_antiban`);
    const autorecovery = await client.db.get(`${member.guild.id}_autorecovery`);

    if (
      executor.id === member.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(member.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for guild ban add actions.');
      return;
    }

    await handleBan(member.guild, executor.id, 'Member Ban | Not Whitelisted');

    if (autorecovery === true) {
      await member.guild.members.unban(target.id).catch((_) => {});
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleGuildBanRemove(member) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_REMOVE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${member.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${member.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${member.guild.id}_antiunban`);
    const autorecovery = await client.db.get(`${member.guild.id}_autorecovery`);

    if (
      executor.id === member.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(member.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for guild ban remove actions.');
      return;
    }

    await handleBan(member.guild, executor.id, 'Member Unban | Not Whitelisted');

    if (autorecovery === true) {
      await member.guild.members.ban(target.id, {
        reason: 'Anti Member Unban'
      }).catch((_) => {});
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleGuildMemberAdd(member) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: 'BOT_ADD' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${member.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${member.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${member.guild.id}_antibot`);
    const autorecovery = await client.db.get(`${member.guild.id}_autorecovery`);

    if (
      executor.id === member.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      !target.bot ||
      antinuke !== true ||
      trusted === true ||
      target.id !== member.id
    ) return;

    if (!hasPermissions(member.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for guild member add actions.');
      return;
    }

    await handleBan(member.guild, executor.id, 'Bot Add | Not Whitelisted');

    if (autorecovery === true) {
      await member.guild.members.ban(target.id, {
        reason: 'Illegal Bot | Not Whitelisted'
      }).catch((_) => {});
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleGuildMemberRemove(member) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${member.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${member.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${member.guild.id}_antikick`);

    if (
      executor.id === member.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      member.id !== target.id ||
      antinuke !== true ||
      trusted === true
    ) return;

    await handleBan(member.guild, executor.id, 'Member Kick | Not Whitelisted');
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleGuildMemberPrune(member) {
  try {
    const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_PRUNE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const antinuke = await client.db.get(`${member.guild.id}_antiprune`);
    const extraOwner = await client.db11.get(`${member.guild.id}_eo.extraownerlist`);
      
    if (
      executor.id === member.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true
    ) return;

    if (!hasPermissions(member.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for guild member prune actions.');
      return;
    }

    await handleBan(member.guild, executor.id, 'Member Prune | Not Whitelisted');
  } catch (err) {
    sendWebhookError(err);
  }
}

async function handleGuildMemberUpdate(oldMember, newMember) {
  try {
    const auditLogs = await newMember.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_ROLE_UPDATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${newMember.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${newMember.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${newMember.guild.id}_antimemberupdate`);
    const autorecovery = await client.db.get(`${newMember.guild.id}_autorecovery`);
    const executorMember = newMember.guild.members.cache.get(executor.id);

    if (!executorMember.permissions.has('MANAGE_ROLES') && !executorMember.permissions.has('ADMINISTRATOR')) {
      return;
    }

    if (
      executor.id === newMember.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(newMember.guild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for guild member update actions.');
      return;
    }

    await handleBan(newMember.guild, executor.id, 'Member Role Update | Not Whitelisted');

    if (autorecovery === true && !newMember.roles.cache.equals(oldMember.roles.cache)) {
      await newMember.roles.set(oldMember.roles.cache).catch((_) => {});
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

client.on('guildBanAdd', handleGuildBanAdd);
client.on('guildBanRemove', handleGuildBanRemove);
client.on('guildMemberAdd', handleGuildMemberAdd);
client.on('guildMemberRemove', handleGuildMemberRemove);
client.on('guildMemberPrune', handleGuildMemberPrune);
client.on('guildMemberUpdate', handleGuildMemberUpdate);
