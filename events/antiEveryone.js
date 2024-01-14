const { Permissions } = require('discord.js');
const client = require('../index.js');

async function handleAntilink(message) {
    if (!message.guild || message.author.bot) return;

    const antilinkEnabled = await client.db5.get(`${message.guild.id}_antieveryone`);
    if (antilinkEnabled !== true) return;

    const botMember = message.guild.me;
    if (!botMember) return;
    if (message.member.roles.highest.comparePositionTo(botMember.roles.highest) >= 0) return;
    if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

    const muteTime = 10 * 60 * 1000;

    if (message.mentions.everyone || message.mentions.here) {
        try {
            await message.delete();
            await message.channel.permissionOverwrites.edit(message.guild.id, {
                VIEW_CHANNEL: false,
                reason: `${message.author.tag} (${message.author.id}) | Anti Everyone`,
            });
            await message.member.timeout(muteTime);

            let msg = await message.channel.send(`\`${message.author.username}\` has been muted for mentioning \`@everyone\` or \`@here\`.`);
        } catch (error) {
            console.error("Error handling antilink:", error);
        }
    }
}

client.on("messageCreate", handleAntilink);
