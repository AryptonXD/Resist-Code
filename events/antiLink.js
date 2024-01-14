const { MessageEmbed } = require('discord.js');
const client = require('../index.js');

const urlRegex = /https?:\/\/[^\s]+/;

async function handleAntilink(message) {
  if (!message.guild || message.author.bot) return;

  const antilinkEnabled = await client.db5.get(`${message.guild.id}_antilink`);
  if (antilinkEnabled !== true) return;

  const botMember = message.guild.me;
  if (!botMember) return;
  if (message.member.roles.highest.comparePositionTo(botMember.roles.highest) >= 0) return;
  if (message.member && message.member.permissions.has("ADMINISTRATOR")) return;

  const messageContent = message.content;
  const muteTime = 5 * 60 * 1000;

  if (urlRegex.test(messageContent)) {
    try {
      await message.delete();
      // await message.member.roles.set([]);
      await message.member.timeout(muteTime);

      let msg = await message.channel.send(`\`${message.author.username}\` has been muted for sending links.`);
      setTimeout(() => {
        msg.delete();
      }, 5000);
    } catch (error) {
      console.error("Error handling antilink:", error);
    }
  }
}

client.on("messageCreate", handleAntilink);
