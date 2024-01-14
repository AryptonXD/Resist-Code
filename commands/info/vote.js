const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

function createVoteEmbed(client) {
  const embed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription("Click the button below.");

  return embed;
}

function createVoteButton(client) {
  const button = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Vote Me")
      .setStyle("LINK")
      .setURL(`https://top.gg/bot/${client.user.id}/vote`)
  );

  return button;
}

module.exports = {
  name: "vote",
  run: async (client, message, args) => {
    const embed = createVoteEmbed(client);
    const button = createVoteButton(client);
      
    message.channel.send({ embeds: [embed], components: [button] });
  },
};
