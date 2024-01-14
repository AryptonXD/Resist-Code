const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

function createInviteEmbed(client) {
  const embed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription("Click the button below.");

  return embed;
}

function createInviteButton(client) {
  const button = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Invite Me")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
  );

  return button;
}

module.exports = {
  name: "invite",
  run: async (client, message, args) => {
    const embed = createInviteEmbed(client);
    const button = createInviteButton(client);

    message.reply({ embeds: [embed], components: [button] });
  },
};
