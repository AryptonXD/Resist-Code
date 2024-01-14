const client = require('../index');
const { ownerIDS } = require('../owner.json');
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

async function handleWebhookCreate(webhook) {
  try {
    const auditLog = await webhook.guild.fetchAuditLogs({ limit: 1, type: 'WEBHOOK_CREATE' });
    const logs = auditLog.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${webhook.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${webhook.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${webhook.guild.id}_antiwebhookcreate`);
    const autorecovery = await client.db.get(`${webhook.guild.id}_autorecovery`);

    if (
      executor.id === webhook.guild.ownerId ||
      executor.id === client.user.id ||
      ownerIDS.includes(executor.id) ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    await handleBan(webhook.guild, executor.id, 'Webhook Create | Not Whitelisted');
      
      if (autorecovery !== true) {
      await webhook.delete().catch(() => {});
    }
  } catch (err) {
    if (err.code === 429) {
      await handleRateLimit();
      return;
    }
    sendWebhookError(err);
  }
}

async function handleWebhookDelete(webhook) {
  try {
    const auditLog = await webhook.guild.fetchAuditLogs({ limit: 1, type: 'WEBHOOK_DELETE' });
    const logs = auditLog.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${webhook.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${webhook.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${webhook.guild.id}_antiwebhookdelete`);
    const autorecovery = await client.db.get(`${webhook.guild.id}_autorecovery`);

    if (
      executor.id === webhook.guild.ownerId ||
      executor.id === client.user.id ||
      ownerIDS.includes(executor.id) ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    await handleBan(webhook.guild, executor.id, 'Webhook Delete | Not Whitelisted');
      
      if (autorecovery === true) {
      const channel = webhook.channel;
      const webhookName = webhook.name;
      const webhookAvatar = webhook.avatar;

      await channel.createWebhook(webhookName, {
        avatar: webhookAvatar,
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

async function handleWebhookUpdate(oldWebhook, newWebhook) {
  try {
    const auditLog = await newWebhook.guild.fetchAuditLogs({ limit: 1, type: 'WEBHOOK_UPDATE' });
    const logs = auditLog.entries.first();

    if (!logs) return;

    const { executor, target } = logs;

    const whitelistData = await client.db.get(`${newWebhook.guild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${newWebhook.guild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${newWebhook.guild.id}_antiwebhookupdate`);
    const autorecovery = await client.db.get(`${newWebhook.guild.id}_autorecovery`);

    if (
      executor.id === newWebhook.guild.ownerId ||
      executor.id === client.user.id ||
      ownerIDS.includes(executor.id) ||
      extraOwner.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    await handleBan(newWebhook.guild, executor.id, 'Webhook Update | Not Whitelisted');
      
     if (autorecovery === true) {
      await newWebhook.edit({
        name: oldWebhook.name,
        avatar: oldWebhook.avatar,
        channel: oldWebhook.channel,
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

function sendWebhookError(error) {
  webhookClient.send(error).catch(() => {});
}

client.on("webhookCreate", handleWebhookCreate);
client.on("webhookDelete", handleWebhookDelete);
client.on("webhookUpdate", handleWebhookUpdate);
