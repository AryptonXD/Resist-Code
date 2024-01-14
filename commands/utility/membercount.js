const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "membercount",
    aliases: ['mc'],
    run: async (client, message, args) => {
function createEmbed(guild, memberCount, author) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${memberCount}** members`)
        .setFooter(`Requested by: ${author.username}`, author.displayAvatarURL({ dynamic: true }));
}
        const memberCount = message.guild.memberCount;
        const stts = createEmbed(message.guild, memberCount, message.author);
        message.channel.send({ embeds: [stts] });
    }
};
