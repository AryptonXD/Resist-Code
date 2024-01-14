const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Displays the bot\'s uptime.'),

  async execute(client, interaction) {
    function formatUptime(totalSeconds) {
      const days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);

      return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    }

    const uptimeInSeconds = Math.floor(client.uptime / 1000);
    const uptime = formatUptime(uptimeInSeconds);

    const pingEmbed = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`\`\`\`\nUptime  ::  ${uptime}\`\`\``);

    interaction.reply({ embeds: [pingEmbed] });
  },
};
