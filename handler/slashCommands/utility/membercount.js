const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Returns the number of members in the server.'),
    async execute(client, interaction) {
        
function createEmbed(guild, memberCount, user) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${memberCount}** members`)
        .setFooter(`Requested by: ${user.username}`, user.displayAvatarURL({ dynamic: true }));
}
        const memberCount = interaction.guild.memberCount;
        const stts = createEmbed(interaction.guild, memberCount, interaction.user);
        interaction.reply({ embeds: [stts], ephemeral: true });
    }
};
