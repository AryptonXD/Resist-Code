const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emoji = require('../../emoji.js');

module.exports = {
  name: "serverinfo",
  aliases: ["guildinfo", "server", "guild"],
  run: async (client, message, args) => {
    const guild = message.guild;

    const serverOwnerId = guild.ownerId;
    const serverOwner = guild.members.cache.get(serverOwnerId);
    const serverIconURL = guild.iconURL({ dynamic: true }) || "";
    const memberCount = guild.memberCount;

    const createButton = (label, style, customId, disabled) => {
      return new MessageButton().setStyle(style).setCustomId(customId).setLabel(label).setDisabled(disabled);
    };

    const createRow = (buttons) => {
      return new MessageActionRow().addComponents(...buttons);
    };

    const button1 = createRow([
      createButton("General", "SUCCESS", "first", true),
      createButton("Members", "SECONDARY", "second", false),
      createButton("Channels", "SECONDARY", "third", false),
    ]);

    const button2 = createRow([
      createButton("General", "SECONDARY", "first", false),
      createButton("Members", "SUCCESS", "second", true),
      createButton("Channels", "SECONDARY", "third", false),
    ]);

    const button3 = createRow([
      createButton("General", "SECONDARY", "first", false),
      createButton("Members", "SECONDARY", "second", false),
      createButton("Channels", "SUCCESS", "third", true),
    ]);

    const createEmbed = (fields) => {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, serverIconURL)
        .setThumbnail(serverIconURL);

      fields.forEach((field) => {
        if (field.value) {
          embed.addField(field.name, field.value);
        }
      });

      return embed;
    };

    const generalInfo = createEmbed([
      { name: "Server Name", value: guild.name },
      { name: "Server Owner", value: serverOwner.user.tag },
      { name: "Server ID", value: guild.id },
      { name: "Created At", value: `<t:${Math.floor(guild.createdAt / 1000)}:F> [<t:${Math.floor(guild.createdAt / 1000)}:R>]` },
    ]);

    const membersInfo = createEmbed([
      { name: "Total Members", value: memberCount }
    ]);

    const channelsInfo = createEmbed([
      { name: "Text Channels", value: guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size },
      { name: "Voice Channels", value: guild.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size },
      { name: "Categories", value: guild.channels.cache.filter((channel) => channel.type === "GUILD_CATEGORY").size },
    ]);

    const messageComponent = await message.channel.send({ embeds: [generalInfo], components: [button1] });

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
            interaction.update({ embeds: [generalInfo], components: [button1] });
            break;
          case "second":
            interaction.update({ embeds: [membersInfo], components: [button2] });
            break;
          case "third":
            interaction.update({ embeds: [channelsInfo], components: [button3] });
            break;
        }
      }
    });

    collector.on("end", () => {
      messageComponent.edit({ components: [button1] });
    });
  },
};
