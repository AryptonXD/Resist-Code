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

async function handleRoleCreate(role) {
  try {
    const auditLogs = await role.guild.fetchAuditLogs({ limit: 1, type: 'ROLE_CREATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${role.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${role.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${role.guild.id}_antirolecreate`);
    const autorecovery = await client.db.get(`${role.guild.id}_autorecovery`);

    if (
      executor.id === role.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true ||
      role.managed
    ) return;

    await handleBan(role.guild, executor.id, 'Role Create | Not Whitelisted');

    if (autorecovery === true) {
      await role.delete();
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleRoleDelete(role) {
  try {
    const auditLogs = await role.guild.fetchAuditLogs({ limit: 1, type: 'ROLE_DELETE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${role.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${role.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${role.guild.id}_antiroledelete`);
    const autorecovery = await client.db.get(`${role.guild.id}_autorecovery`);

    if (
      executor.id === role.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true ||
      role.managed
    ) return;

    await handleBan(role.guild, executor.id, 'Role Delete | Not Whitelisted');

    if (autorecovery === true) {
      await role.guild.roles.create({
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        permissions: role.permissions,
        position: role.position,
        mentionable: role.mentionable,
        reason: 'Anti Role Delete'
      });
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleRoleUpdate(oldRole, newRole) {
  try {
    const auditLogs = await newRole.guild.fetchAuditLogs({ limit: 1, type: 'ROLE_UPDATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${newRole.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${newRole.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${newRole.guild.id}_antiroleupdate`);
    const autorecovery = await client.db.get(`${newRole.guild.id}_autorecovery`);

    if (
      executor.id === newRole.guild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (antinuke) {
      await handleBan(newRole.guild, executor.id, 'Anti Role Update');
    }

    if (autorecovery === true) {
      await newRole.edit({
        name: oldRole.name,
        color: oldRole.color,
        hoist: oldRole.hoist,
        permissions: oldRole.permissions,
        position: oldRole.position,
        mentionable: oldRole.mentionable,
        reason: 'Anti Role Delete'
      });
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

client.on('roleCreate', handleRoleCreate);
client.on('roleDelete', handleRoleDelete);
client.on('roleUpdate', handleRoleUpdate);
