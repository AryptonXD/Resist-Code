const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolecount')
        .setDescription('Returns the number of roles in the server.'),
    async execute(client, interaction) {
        
function createEmbed(guild, rolesCount, user) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${rolesCount}** roles`)
        .setFooter(`Requested by: ${user.username}`, user.displayAvatarURL({ dynamic: true }));
}
        const rolesCount = interaction.guild.roles.cache.size;
        const stts = createEmbed(interaction.guild, rolesCount, interaction.user);
        interaction.reply({ embeds: [stts], ephemeral: true });
    }
};
