const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "rolecount",
    aliases: ['rc'],
    run: async (client, message, args) => {
function createEmbed(guild, rolesCount, author) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${rolesCount}** roles`)
        .setFooter(`Requested by: ${author.username}`, author.displayAvatarURL({ dynamic: true }));
}
        const rolesCount = message.guild.roles.cache.size;
        const stts = createEmbed(message.guild, rolesCount, message.author);
        message.channel.send({ embeds: [stts] });
    }
};
