const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "emojicount",
    aliases: ['ec'],
    run: async (client, message, args) => {
function createEmbed(guild, emojiCount, author) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${emojiCount}** emojis`)
        .setFooter(`Requested by: ${author.username}`, author.displayAvatarURL({ dynamic: true }));
}
        const emojis = message.guild.emojis.cache.size;
        const stts = createEmbed(message.guild, emojis, message.author);
        message.channel.send({ embeds: [stts] });
    }
};
