const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "boostcount",
  aliases: ['bc'],
  run: async (client, message, args) => {
function createStatusEmbed(guild, message) {
  return new MessageEmbed()
    .setColor(client.color)
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setDescription(`**${guild.premiumSubscriptionCount}** boosts`)
    .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));
}

    const stts = createStatusEmbed(message.guild, message);
    message.channel.send({ embeds: [stts] });
  }
};
