const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "serverlist",
  aliases: ["srlist"],
  VoteOnly: true,
  run: async (client, message, args) => {

    const serversPerPage = 10;

    const guildsArray = Array.from(client.guilds.cache.values());
    const totalGuilds = guildsArray.length;

    let currentPage = 0;

    const totalPages = Math.ceil(totalGuilds / serversPerPage);

    const generateDescription = () => {
      const startIndex = currentPage * serversPerPage;
      const endIndex = startIndex + serversPerPage;
      const currentGuilds = guildsArray
        .slice(startIndex, endIndex)
        .sort((a, b) => b.memberCount - a.memberCount);
    
      return currentGuilds
        .map((guild, index) => {
          const memberCount = guild.memberCount.toLocaleString();
          return `\`${startIndex + index + 1}\` - ${guild.name} | ${memberCount} Members | ${guild.id}`;
        })
        .join("\n");
    };
    

    const generateEmbed = () => {
      const sortedGuilds = guildsArray.sort((a, b) => b.memberCount - a.memberCount);
    
      const startIndex = currentPage * serversPerPage;
      const endIndex = startIndex + serversPerPage;
      const currentGuilds = sortedGuilds.slice(startIndex, endIndex);
    
      const embed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(client.color)
        .setFooter(`Page - ${currentPage + 1}/${totalPages}`)
        .setDescription(`Total Servers - ${totalGuilds}\n\n${generateDescription(currentGuilds)}`);
    
      return embed;
    };

const sortedGuilds = guildsArray.sort((a, b) => b.memberCount - a.memberCount);
const startIndex = currentPage * serversPerPage;
const endIndex = startIndex + serversPerPage;
const currentGuilds = sortedGuilds.slice(startIndex, endIndex);
      
if (currentGuilds.length === 0) {
    
    const embed = new MessageEmbed()
      .setTitle(`Page ${totalPages}`)
      .setDescription("Nothing to Show.")
      .setColor(client.color);

    pag.components.forEach((button) => {
      button.setDisabled(true);
    });

    return embed;
  }

    const pag = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("first")
        .setLabel("≪")
        .setDisabled(true),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("previous")
        .setLabel("Previous")
        .setDisabled(true),
      new MessageButton()
        .setStyle("DANGER")
        .setCustomId("close")
        .setLabel("Close"),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("next")
        .setLabel("Next"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("last")
        .setLabel("≫")
        .setDisabled(false)
    );
      
if (totalPages === 1) {
  pag.components.forEach((button) => {
    button.setDisabled(true);
  });
}

    const msg = await message.channel.send({ embeds: [generateEmbed()], components: [pag] });

    const collector = msg.createMessageComponentCollector({ filter: (interaction) => interaction.user.id === message.author.id, time: 60000 });

    collector.on("collect", async (interaction) => {
      try {
        if (interaction.customId === "previous") {
          if (currentPage > 0) {
            currentPage--;
          }
        } else if (interaction.customId === "next") {
          if (currentPage < totalPages - 1) {
            currentPage++;
          }
        } else if (interaction.customId === "first") {
          currentPage = 0;
        } else if (interaction.customId === "last") {
          currentPage = totalPages - 1;
        } else if (interaction.customId === "close") {
          collector.stop();
          return;
        }

        const updatedEmbed = generateEmbed();

        const firstButton = pag.components.find((button) => button.customId === "first");
        const previousButton = pag.components.find((button) => button.customId === "previous");
        const nextButton = pag.components.find((button) => button.customId === "next");
        const lastButton = pag.components.find((button) => button.customId === "last");

        firstButton.setDisabled(currentPage === 0);
        previousButton.setDisabled(currentPage === 0);
        nextButton.setDisabled(currentPage === totalPages - 1);
        lastButton.setDisabled(currentPage === totalPages - 1);

        interaction.update({ embeds: [updatedEmbed], components: [pag] });
      } catch (error) {
        console.error("An error occurred while handling the interaction:", error);
      }
    });

    collector.on("end", () => {
      pag.components.forEach((button) => {
        button.setDisabled(true);
      });

      msg.edit({ components: [pag] });
    });
  },
};
