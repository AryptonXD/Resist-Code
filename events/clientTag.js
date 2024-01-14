const client = require('../index');
const { MessageActionRow, MessageButton } = require("discord.js");
const { bot } = require('../settings');

async function handleMessageCreate(message) {
  try {
    let prefix;
    const dbPrefix = await client.db8.get(`${message.guild.id}_prefix`);

    if (dbPrefix) {
      prefix = dbPrefix;
    } else {
      prefix = bot.info.prefix;
    }

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),
      new MessageButton()
        .setLabel("Support Server")
        .setStyle("LINK")
        .setURL(`https://dsc.gg/resisthq`)
    )

    const MEMBER = message.author;
    const ID = MEMBER.id;

    if (message.content === `<@${client.user.id}>`) {
      return message.channel.send({ content: `My prefix for this Server is \`${prefix}\``, components: [button] });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

client.on('messageCreate', handleMessageCreate);
