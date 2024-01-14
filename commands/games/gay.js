const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "howgay",
  aliases: ['gay'],
  run: async (client, message, args) => {
    const user = 
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const ID = user.id;

    let rng = Math.floor(Math.random() * 100) + 1;

    const howgayembed = new MessageEmbed()
      .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${ID}> is ` + rng + "% Gay🌈")
      .setColor(client.color);

    message.channel.send({ embeds: [howgayembed] });
  },
};
