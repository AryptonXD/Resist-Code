const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojicount')
        .setDescription('Returns the number of emojis in the server.'),
    async execute(client, interaction) {
        
function createEmbed(guild, emojiCount, user) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${emojiCount}** emojis`)
        .setFooter(`Requested by: ${user.username}`, user.displayAvatarURL({ dynamic: true }));
}
        const emojis = interaction.guild.emojis.cache.size;
        const stts = createEmbed(interaction.guild, emojis, interaction.user);
        interaction.reply({ embeds: [stts], ephemeral: true });
    }
};
