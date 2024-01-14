const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "channelcount",
    aliases: ['cc'],
    run: async (client, message, args) => {
        function countChannels(channels) {
    const loda = channels.filter(channel => channel.type === 'GUILD_TEXT').size;
    const lodaa = channels.filter(channel => channel.type === 'GUILD_VOICE').size;

    return { loda, lodaa };
}

function createEmbed(guild, channelCount, author) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${channelCount}** channels`)
        .setFooter(`Requested by: ${author.username}`, author.displayAvatarURL({ dynamic: true }));
}
        const channels = message.guild.channels.cache;
        const { loda, lodaa } = countChannels(channels);
        const stts = createEmbed(message.guild, loda + lodaa, message.author);
        message.channel.send({ embeds: [stts] });
    }
};
