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

async function handleGuildUpdate(oldGuild, newGuild) {
  try {
    if (globalCooldown) {
      await handleRateLimit();
    }

    const auditLogs = await newGuild.fetchAuditLogs({ limit: 1, type: 'GUILD_UPDATE' });
    const logs = auditLogs.entries.first();

    if (!logs) return;

    const { executor } = logs;

    const whitelistData = await client.db.get(`${oldGuild.id}_wl`);
    const trusted = whitelistData?.whitelisted.includes(executor.id);
    const extraOwner = await client.db11.get(`${newGuild.id}_eo.extraownerlist`);
    const antinuke = await client.db.get(`${newGuild.id}_antiguildupdate`);
    const autorecovery = await client.db.get(`${newGuild.id}_autorecovery`);

    if (
      executor.id === oldGuild.ownerId ||
      executor.id === client.user.id ||
      extraOwner.includes(executor.id) ||
      ownerIDS.includes(executor.id) ||
      antinuke !== true ||
      trusted === true
    ) return;

    if (!hasPermissions(newGuild.me, ['ADMINISTRATOR', 'BAN_MEMBERS'])) {
      sendWebhookError('Bot lacks necessary permissions for guild update actions.');
      return;
    }

    await handleBan(newGuild, executor.id, 'Guild Update | Not Whitelisted');

    if (autorecovery === true) {
      const oldIcon = oldGuild.iconURL();
      const oldName = oldGuild.name;

      const newIcon = newGuild.iconURL();
      const newName = newGuild.name;

      if (oldName !== newName) {
        await newGuild.setName(oldName);
      }

      if (oldIcon !== newIcon) {
        await newGuild.setIcon(oldIcon);
      }

      if (oldGuild.features.includes('VANITY_URL') && newGuild.features.includes('VANITY_URL')) {
        const oldVanityCode = oldGuild.vanityURLCode;
        const newVanityCode = newGuild.vanityURLCode;

        if (oldVanityCode !== newVanityCode) {
          await phin({
            method: 'PATCH',
            url: `https://discord.com/api/v9/guilds/${newGuild.id}/vanity-url`,
            json: true,
            headers: {
              "accept": "*/*",
              "Content-Type": 'application/json',
              "Authorization": `Bot ${bot.info.token}`
            },
            data: JSON.stringify({
              code: `${oldVanityCode}`
            }),
          }).catch((_) => {});
        }
      }

      if (!newGuild.equals(oldGuild)) {
        await newGuild.edit({
          features: oldGuild.features
        }).catch((_) => {});
      }

      if (oldGuild.name !== newGuild.name) {
        newGuild.setName(oldGuild.name);
      }

      if (oldGuild.iconURL() !== newGuild.iconURL()) {
        newGuild.setIcon(oldGuild.iconURL());
      }

      if (!newGuild.equals(oldGuild)) {
        newGuild.edit({
          features: oldGuild.features
        });
      }

      if (!oldGuild.features.includes('COMMUNITY') && newGuild.features.includes('COMMUNITY')) {
        newGuild.edit({
          features: oldGuild.features
        });

        for (let i = 0; i <= 3; i++) {
          newGuild.channels.cache.forEach((channel) => {
            if (channel.name === 'rules' || channel.name === 'moderator-only') {
              channel.delete().catch((_) => {});
            }
          });
        }
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

client.on('guildUpdate', handleGuildUpdate);
