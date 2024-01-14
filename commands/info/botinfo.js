const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emoji = require('../../emoji.js');

module.exports = {
  name: "info",
  aliases: ["botinfo", "bi", "resistinfo"],
  run: async (client, message, args) => {
    const botGuilds = client.guilds.cache.size;
    const usersCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const botChannels = client.channels.cache.size;

    const createButton = (label, style, customId, disabled) => {
      return new MessageButton().setStyle(style).setCustomId(customId).setLabel(label).setDisabled(disabled);
    };

    const createRow = (buttons) => {
      return new MessageActionRow().addComponents(...buttons);
    };

    const button = createRow([
      createButton(`${botGuilds} Guilds`, "DANGER", "third", true),
      createButton(`${usersCount} Users`, "PRIMARY", "fourth", true),
      createButton(`${botChannels} Channels`, "SUCCESS", "fifth", true)
    ]);

    const button1 = new MessageActionRow().addComponents(
      new MessageButton().setStyle("SUCCESS").setCustomId("first").setLabel("Basic Info").setEmoji("1147576309925544046").setDisabled(true),
      new MessageButton().setStyle("SECONDARY").setCustomId("second").setLabel("Team Info").setEmoji("1147576417056460864").setDisabled(false)
    );

    const button2 = new MessageActionRow().addComponents(
      new MessageButton().setStyle("SECONDARY").setCustomId("first").setLabel("Basic Info").setEmoji("1147576309925544046").setDisabled(false),
      new MessageButton().setStyle("SUCCESS").setCustomId("second").setLabel("Team Info").setEmoji("1147576417056460864").setDisabled(true)
    );

    const button3 = new MessageActionRow().addComponents(
      new MessageButton().setStyle("SECONDARY").setCustomId("first").setLabel("Basic Info").setEmoji("1147576309925544046").setDisabled(true),
      new MessageButton().setStyle("SUCCESS").setCustomId("second").setLabel("Team Info").setEmoji("1147576417056460864").setDisabled(true)
    );

    const createEmbed = (fields) => {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(message.author.tag, message.member.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.member.displayAvatarURL({ dynamic: true }));

      fields.forEach((field) => {
        if (field.value) {
          embed.addField(field.name, field.value);
        }
      });

      return embed;
    };

    const embed1 = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    	.setDescription(`Resist Bot - Your Discord server's all-in-one solution. Featuring Antinuke, Automod, Autorole, Welcome, Leave, Boost-Message, Custom-Roles, Voice-Roles, Nightmode, Media-Channels, Ignore-Channels, Extra Owner/Admin and more. Use '?' prefix to empower your server.`)
     	.addField("__Basic Information__", `**NodeJs Version**: v${process.version.slice(1)}\n**Library**: [discord.js](https://discord.js.org/)`)
		.addField("__Links__", `[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) : [Support](https://dsc.gg/resisthq) : [Vote](https://top.gg/bot/${client.user.id}/vote)`)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))

    const embed2 = createEmbed([
      { name: `__Owners__`, value: `- [1] [Sumant](https://discord.com/users/762146129927340052) [ID: 762146129927340052]
- [2] [Vanika](https://discord.com/users/991312753279127652) [ID: 991312753279127652]
- [3] [Invisible](https://discord.com/users/218151216650256384) [ID: 218151216650256384]
- [4] [Ragnor](https://discord.com/users/1090957904410071120) [ID: 1090957904410071120]
- [5] [Zeus](https://discord.com/users/1022080754135613480) [ID: 1022080754135613480]` },
{ name: `__Developer__`, value: `- [1] [Arypton](https://discord.com/users/560115112078475266) [ID: 560115112078475266]` },
{ name: `__Contributors__`, value: `- [1] [Devil Groxan](https://discord.com/users/785927566174846988) [ID: 785927566174846988]` },
    ]);

    const messageComponent = await message.channel.send({ embeds: [embed1], components: [button1, button] });

    const collector = messageComponent.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true });
          return false;
        }
      },
      time: 600000,
      idle: 800000 / 2,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.isButton()) {
        switch (interaction.customId) {
          case "first":
            interaction.update({ embeds: [embed1], components: [button1, button] });
            break;
          case "second":
            interaction.update({ embeds: [embed2], components: [button2, button] });
            break;
        }
      }
    });

    collector.on("end", () => {
      messageComponent.edit({ components: [button3, button] });
    });
  }
};
