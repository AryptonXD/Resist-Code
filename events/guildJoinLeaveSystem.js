const client = require('../index');
const { MessageEmbed } = require("discord.js");

client.on('guildCreate', async (guild) => {
  const data = await client.db12.get(`${guild.id}_premium`);

  const promises = [];

  if (!data) {
    promises.push(client.db12.set(`${guild.id}_premium`, {
      active: false,
      premiumExpiresAt: null,
    }));
  } else if (Date.now() >= data.premiumExpiresAt) {
    promises.push(client.db12.set(`${guild.id}_premium`, {
      active: false,
      premiumExpiresAt: null,
    }));
  }

  promises.push(
    client.db.set(`${guild.id}_wl`, { whitelisted: [] }),
    client.db14.set(`${guild.id}_mediachannels`, { mediachannellist: [] }),
    client.db11.set(`${guild.id}_eo`, { extraownerlist: [] }),
    client.db11.set(`${guild.id}_ea`, { extraadminlist: [] }),
    client.db10.set(`${guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] }),
    client.db15.set(`${guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] }),
    client.db1.set(`${guild.id}_autorole`, { role: { humans: [], bots: [] } })
  );

  await Promise.all(promises);
});

client.on('guildDelete', async (guild) => {
  const promises = [
    client.db11.delete(`${guild.id}_eo`),
    client.db11.delete(`${guild.id}_ea`),
    client.db10.delete(`${guild.id}_ic`),
    client.db14.delete(`${guild.id}_mediachannels`),
    client.db.delete(`${guild.id}_antinuke`),
    client.db.delete(`${guild.id}_antiban`),
    client.db.delete(`${guild.id}_antikick`),
    client.db.delete(`${guild.id}_antibot`),
    client.db.delete(`${guild.id}_antiunban`),
    client.db.delete(`${guild.id}_antiguildupdate`),
    client.db.delete(`${guild.id}_antimemberupdate`),
    client.db.delete(`${guild.id}_antichannelcreate`),
    client.db.delete(`${guild.id}_antichanneldelete`),
    client.db.delete(`${guild.id}_antichannelupdate`),
    client.db.delete(`${guild.id}_antirolecreate`),
    client.db.delete(`${guild.id}_antiroledelete`),
    client.db.delete(`${guild.id}_antiroleupdate`),
    client.db.delete(`${guild.id}_antiwebhookcreate`),
    client.db.delete(`${guild.id}_antiwebhookdelete`),
    client.db.delete(`${guild.id}_antiwebhookupdate`),
    client.db.delete(`${guild.id}_antiemojicreate`),
    client.db.delete(`${guild.id}_antiemojidelete`),
    client.db.delete(`${guild.id}_antiemojiupdate`),
    client.db.delete(`${guild.id}_antistickercreate`),
    client.db.delete(`${guild.id}_antistickerdelete`),
    client.db.delete(`${guild.id}_antistickerupdate`),
    client.db.delete(`${guild.id}_antiprune`),
    client.db.delete(`${guild.id}_autorecovery`),
    client.db.delete(`${guild.id}_kickpunish`),
    client.db.delete(`${guild.id}_banpunish`),
    client.db.delete(`${guild.id}_quarantine`),
    client.db.delete(`${guild.id}_wl`),
    client.db15.delete(`${guild.id}_nightmode`),
    client.db14.delete(`${guild.id}_mediachannels`)
  ];

  await Promise.all(promises);
});

client.on('guildCreate', async (guild) => {
  const owner = await guild.fetchOwner();
  const logChannelId = "1139937179980795944";

  const newGuildEmbed = new MessageEmbed()
    .setColor(client.color)
    .setTitle("Guild Joined")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setDescription(`**Server Name:** ${guild.name}\n**Server ID:** ${guild.id}\n**Owner Tag:** ${owner.user.tag}\n**Owner ID:** ${owner.id}\n**Members:** ${guild.memberCount}`);

  const logChannel = client.channels.cache.get(logChannelId);
  if (logChannel) {
    await logChannel.send({ embeds: [newGuildEmbed] });
  } else {
    console.log(`Log channel with ID ${logChannelId} not found.`);
  }
});

client.on('guildDelete', async (guild) => {
  const owner = await guild.fetchOwner();
  const logChannelId = "1139937182451236984";

  const lostGuildEmbed = new MessageEmbed()
    .setColor(client.color)
    .setTitle("Guild Leave")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setDescription(`**Server Name:** ${guild.name}\n**Server ID:** ${guild.id}\n**Owner Tag:** ${owner.user.tag}\n**Owner ID:** ${owner.id}\n**Members:** ${guild.memberCount}`);

  const logChannel = client.channels.cache.get(logChannelId);
  if (logChannel) {
    await logChannel.send({ embeds: [lostGuildEmbed] });
  } else {
    console.log(`Log channel with ID ${logChannelId} not found.`);
  }
});
