const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

function createCodeEmbed(client) {
  const embed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription("Click the button below.");

  return embed;
}

function createCodeButton() {
  const button = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Source Code")
      .setStyle("LINK")
      .setURL(`https://youtu.be/dQw4w9WgXcQ`)
  );

  return button;
}

module.exports = {
  name: "code",
  aliases: ['source'],
  run: async (client, message, args) => {
    const embed = createCodeEmbed(client);
    const button = createCodeButton();
      
    message.channel.send({ embeds: [embed], components: [button] });
  },
};
