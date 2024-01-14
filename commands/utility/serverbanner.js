const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverbanner",
  run: async (client, message, args) => {
    try {
      if (message.guild.banner) {
        const embed = new MessageEmbed()
          .setTitle(`${message.guild.name} SERVER BANNER`)
          .setColor(client.color)
          .setImage(message.guild.bannerURL({ size: 4096 }));

        message.reply({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setDescription("This server has no banner.")
          .setColor(client.color);

        message.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error("Error fetching server banner:", error);
      const errorEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription("An error occurred while fetching the server banner.");

      message.reply({ embeds: [errorEmbed] });
    }
  },
};
