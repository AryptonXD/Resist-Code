const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channelcount')
        .setDescription('Returns the number of text and voice channels in the server.'),
    async execute(client, interaction) {
        
function countChannels(channels) {
    const textChannelCount = channels.filter(channel => channel.type === 'GUILD_TEXT').size;
    const voiceChannelCount = channels.filter(channel => channel.type === 'GUILD_VOICE').size;

    return { textChannelCount, voiceChannelCount };
}

function createEmbed(guild, channelCount, user) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${channelCount}** channels`)
        .setFooter(`Requested by: ${user.username}`, user.displayAvatarURL({ dynamic: true }));
}
        const channels = interaction.guild.channels.cache;
        const { textChannelCount, voiceChannelCount } = countChannels(channels);
        const stts = createEmbed(interaction.guild, textChannelCount + voiceChannelCount, interaction.user);
        interaction.reply({ embeds: [stts], ephemeral: true });
    }
};
