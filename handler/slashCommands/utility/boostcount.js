const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        name: "boostcount",
        description: "Returns the number of boosts in the server.",
        options: [],
    },
    async execute(client, interaction) {
        
function createStatusEmbed(guild, user) {
    return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**${guild.premiumSubscriptionCount}** boosts`)
        .setFooter(`Requested by: ${user.username}`, user.displayAvatarURL({ dynamic: true }));
}
        const stts = createStatusEmbed(interaction.guild, interaction.user);
        interaction.reply({ embeds: [stts], ephemeral: true });
    }
};
