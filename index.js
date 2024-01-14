const { Client, Collection, Intents } = require('discord.js');
const { bot } = require('./settings.js');
const config = require('./config.json');
const fs = require('fs')
const { joinVoiceChannel } = require('@discordjs/voice');
const { QuickDB } = require('quick.db');
const token = config.token;
const Dokdo = require('dokdo');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

const DokdoHandler = new Dokdo(client, {
  aliases: ['dokdo', 'dok', 'jsk'],
  prefix: [''],
});

module.exports = client;

client.color = '#2b2d30';

function setupDatabases(client) {
  client.db = new QuickDB({ filePath: './database/antinuke.sqlite' });
  client.db1 = new QuickDB({ filePath: './database/autorole.sqlite' });
  client.db2 = new QuickDB({ filePath: './database/badges.sqlite' });
  client.db3 = new QuickDB({ filePath: './database/customroles.sqlite' });
  client.db4 = new QuickDB({ filePath: './database/noprefix.sqlite' });
  client.db5 = new QuickDB({ filePath: './database/automod.sqlite' });
  client.db6 = new QuickDB({ filePath: './database/vanityroles.sqlite' });
  client.db7 = new QuickDB({ filePath: './database/voiceroles.sqlite' });
  client.db8 = new QuickDB({ filePath: './database/guild.sqlite' });
  client.db9 = new QuickDB({ filePath: './database/welcome.sqlite' });
  client.db10 = new QuickDB({ filePath: './database/ignore.sqlite' });
  client.db11 = new QuickDB({ filePath: './database/extra.sqlite' });
  client.db12 = new QuickDB({ filePath: './database/premium.sqlite' });
  client.db13 = new QuickDB({ filePath: './database/users.sqlite' });
  client.db14 = new QuickDB({ filePath: './database/mediachannel.sqlite' });
  client.db15 = new QuickDB({ filePath: './database/nightmode.sqlite' });
  client.db16 = new QuickDB({ filePath: './database/ticket.sqlite' });
}

function setPresence(client) {
  client.user.setPresence({
    activities: [bot.presence],
    status: "idle",
  });
}

async function updateGuildPremiumStatus() {
  try {
    const allGuilds = client.guilds.cache.values();

    for (const guild of allGuilds) {
      const guildPremiumData = await client.db12.get(`${guild.id}_premium`);

      if (guildPremiumData && guildPremiumData.active && guildPremiumData.premiumExpiresAt <= Date.now()) {
        await client.db12.set(`${guild.id}_premium`, { active: false, premiumExpiresAt: null });
        const whitelisted = await client.db.get(`${guild.id}_wl`);
        whitelisted.whitelisted.splice(15);
        await client.db.set(`${guild.id}_wl`, whitelisted);
        await client.db.set(`${guild.id}_antiprune`, false);
        await client.db.set(`${guild.id}_autorecovery`, false);
        const autoroleData = await client.db1.get(`${guild.id}_autorole`);
        autoroleData.role.humans.splice(2);
        autoroleData.role.bots.splice(2);
        await client.db1.set(`${guild.id}_autorole`, autoroleData);
        const extraOwnerData = await client.db11.get(`${guild.id}_eo`);
        extraOwnerData.extraownerlist.splice(5);
        await client.db11.set(`${guild.id}_eo`, extraOwnerData);
        const extraAdminData = await client.db11.get(`${guild.id}_ea`);
        extraAdminData.extraadminlist.splice(10);
        await client.db11.set(`${guild.id}_ea`, extraAdminData);
        const ignoreData = await client.db10.get(`${guild.id}_ic`);
        ignoreData.ignorechannellist.splice(5);
        ignoreData.ignorebypasslist.splice(10);
        await client.db10.set(`${guild.id}_ic`, ignoreData);
        const mediaData = await client.db14.get(`${guild.id}_mediachannels`);
        mediaData.mediachannellist.splice(10);
        await client.db14.get(`${guild.id}_mediachannels`, mediaData);
        const nightmodeData = await client.db15.get(`${guild.id}_nightmode`);
        nightmodeData.nightmoderoleslist.splice(3);
        nightmodeData.nightmodebypasslist.splice(3);
        await client.db15.get(`${guild.id}_nightmode`, nightmodeData);
        console.log(`Guild ${guild.name} (${guild.id}) premium subscription has expired.`);
      }
    }
  } catch (error) {
    console.error('Error updating guild premium status:', error);
  }
}

function setupVoiceConnection(client) {
  setInterval(() => {
    const channelid = '1139937148297023630';
    const channel = client.channels.cache.get(channelid);
    if (!channel) return;
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }, 1000 * 3);
}

function setupCollections(client) {
  client.commands = new Collection();
  client.aliases = new Collection();
  client.events = new Collection();
  client.slashCommands = new Collection();
  client.categories = fs.readdirSync('./commands');
}
client.on('message', async (message) => {
  await DokdoHandler.run(message)
});

function loadHandlers(client) {
  ['command', 'slashCommand'].forEach((handler) => {
    require(`./handler/${handler}`)(client);
  });
}

function setupClient(client) {
  setupDatabases(client);
  setPresence(client);
  setupVoiceConnection(client);
  setupCollections(client);
  loadHandlers(client);
}

client.on("ready", async (client) => {
  setupClient(client);
  console.log(`Made by Arypton_xD`)
  console.log(`Logged in as ${client.user.tag}`);
  setInterval(updateGuildPremiumStatus, 60000);
});

client.login(token);
