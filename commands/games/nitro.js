const Discord = require("discord.js");
const { ownerIDS } = require('../../owner.json');

module.exports = {
  name: "nitro",
  run: async (client, message) => {

    if (!ownerIDS.includes(message.author.id)) return;

    let embed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setTitle("A wild gift appears")
      .setThumbnail("https://cdn.discordapp.com/attachments/899647915339972641/904326176909176882/EmSIbDzXYAAb4R7.png")
      .setDescription(`**Nitro** \n Expires in 48 hours`);

    let button = new Discord.MessageButton()
      .setCustomId('brrrrr')
      .setLabel('ㅤㅤㅤㅤㅤㅤAcceptㅤㅤㅤㅤㅤㅤ')
      .setStyle('SUCCESS')

    const row = new Discord.MessageActionRow()
      .addComponents([button])

    return message.channel.send({ embeds: [embed], components: [row] })
  }
}
