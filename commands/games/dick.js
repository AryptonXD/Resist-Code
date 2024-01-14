const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dicksize",
  aliases: ["dick", "pp", "ppsize"],
  run: async (client, message, args) => {
    const sizes = [
      "8D",
      "8=D",
      "8==D",
      "8===D",
      "8====D",
      "8=====D",
      "8======D",
      "8=======D",
      "8========D",
      "8=========D",
      "8==========D",
      "8===========D",
      "8============D",
      "8=============D",
      "8==============D",
      "8===============D",
      "8================D",
      "8==================D"
    ];

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    const result = sizes[Math.floor(Math.random() * sizes.length)];

    const embed = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
      .addField(`${member.user.username}'s pp Size Is`, `${result}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
