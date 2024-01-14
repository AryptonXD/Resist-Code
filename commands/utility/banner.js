const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "banner",
  run: async (client, message, args) => {
    try {
      let user = message.mentions.members.first() || message.guild.members.cache.find(
        (member) =>
          member.user.username.toLowerCase() === args.join(" ").toLowerCase()
      ) || message.author;

      const { data } = await axios.get(
        `https://discord.com/api/users/${user.id}`,
        {
          headers: {
            Authorization: `Bot ${client.token}`,
          },
        }
      );

      if (data.banner) {
        const bannerUrl = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}.png?size=4096`;

        const embed = new MessageEmbed()
          .setColor(client.color)
          .setTitle(`Banner Of ${user.user.tag}`)
          .setImage(bannerUrl)
          .setFooter(`Requested By: ${message.author.tag}`);

        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor(client.color)
          .setDescription(`${user.tag} doesn't have a banner.`);

        message.channel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
      const errorEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription("An error occurred while fetching the banner.");

      message.channel.send({ embeds: [errorEmbed] });
    }
  },
};
