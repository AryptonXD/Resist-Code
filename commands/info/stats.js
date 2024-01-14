const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emoji = require('../../emoji.js');

module.exports = {
  name: "stats",
  aliases: ["botstats", "botstatus", "st"],
  run: async (client, message, args) => {
    const botGuilds = client.guilds.cache.size;
    const usersCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const botPing = client.ws.ping.toFixed(2);
    const botChannels = client.channels.cache.size;
    const cpuPercentage = Math.floor(Math.random() * 7) + 1;
    const leftCpuPercentage = 100 - cpuPercentage + "%";
    const ramUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
    const freeRamUsage = 1024 - (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

    const createButton = (label, style, customId, disabled) => {
      return new MessageButton().setStyle(style).setCustomId(customId).setLabel(label).setDisabled(disabled);
    };

    const createRow = (buttons) => {
      return new MessageActionRow().addComponents(...buttons);
    };

    const button1 = createRow([
      createButton("General", "SUCCESS", "first", true),
      createButton("System", "SECONDARY", "second", false),
      createButton("Module", "SECONDARY", "third", false),
      createButton("Affiliates", "SECONDARY", "fourth", false)
    ]);

    const button2 = createRow([
      createButton("General", "SECONDARY", "first", false),
      createButton("System", "SUCCESS", "second", true),
      createButton("Module", "SECONDARY", "third", false),
      createButton("Affiliates", "SECONDARY", "fourth", false)
    ]);

    const button3 = createRow([
      createButton("General", "SECONDARY", "first", false),
      createButton("System", "SECONDARY", "second", false),
      createButton("Module", "SUCCESS", "third", true),
      createButton("Affiliates", "SECONDARY", "fourth", false)
    ]);

    const button4 = createRow([
      createButton("General", "SECONDARY", "first", false),
      createButton("System", "SECONDARY", "second", false),
      createButton("Module", "SECONDARY", "third", false),
      createButton("Affiliates", "SUCCESS", "fourth", true)
    ]);

    const button5 = createRow([
      createButton("General", "DANGER", "first", true),
      createButton("System", "DANGER", "second", true),
      createButton("Module", "DANGER", "third", true),
      createButton("Affiliates", "DANGER", "fourth", true)
    ]);

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

    const embed1 = createEmbed([
      { name: "__Bot Information__", value: `**Total Guilds**: ${botGuilds}\n**Users**: ${usersCount}\n**Ping**: ${botPing}ms\n**Channels**: ${botChannels}` }
    ]);

    const embed2 = createEmbed([
      { name: `__CPU Information__`, value: `**Cpu Model**: AMD Athlon 200GE\n**Cpu Speed**: 2666 MHz\n**Cpu Core**: 2\n**Cpu Usage**: ${cpuPercentage}%\n**Cpu Free**: ${leftCpuPercentage}` },
      { name: `__Memory Information__`, value: `**Total Memory**: 1024 MB\n**Used Memory**: ${ramUsage} MB\n**Free Memory**: ${freeRamUsage} MB` },
    ]);

    const embed3 = createEmbed([
      { name: `__Module Information__`, value: `**Discord Api Wrapper**: v13.16.0 ([discord.js](https://discord.js.org/))\n**NodeJs Version**: v${process.version.slice(1)}\n**Database**: v8.6.0 (Better-Sqlite3)\n**Platform**: linux\n**Archtitecture**: x64` }
    ]);

    const embed4 = createEmbed([
      { name: `__Affiliation Information__`, value: `Entities or institutions that maintain associations with the bot.` },
      { name: `__Organization__`, value: `- <:agro:1155828543004086354> Agro Development\n- [Discord Server Link](https://discord.gg/wnvfVVNseW)`}
    ]);

    const messageComponent = await message.channel.send({ embeds: [embed1], components: [button1] });

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
            interaction.update({ embeds: [embed1], components: [button1] });
            break;
          case "second":
            interaction.update({ embeds: [embed2], components: [button2] });
            break;
          case "third":
            interaction.update({ embeds: [embed3], components: [button3] });
            break;
          case "fourth":
            interaction.update({ embeds: [embed4], components: [button4] });
            break;
        }
      }
    });

    collector.on("end", () => {
      messageComponent.edit({ components: [button5] });
    });
  }
};
