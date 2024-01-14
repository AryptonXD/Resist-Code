const { MessageEmbed } = require('discord.js');

const snipedMessages = new Map();

module.exports = {
    name: 'snipe',
    UserPerms: ['MANAGE_MESSAGES'],
    BotPerms: ['EMBED_LINKS'],
    run: async (client, message, args) => {
        const snipeData = snipedMessages.get(message.channel.id);

        client.on('messageDelete', (message) => {
            if (!message.author.bot) {
                snipedMessages.set(message.channel.id, {
                    content: message.content,
                    author: message.author,
                    deletedAt: new Date(),
                });
            }
        });

        if (snipeData) {
            const { content, author, deletedAt } = snipeData;
            const embed = new MessageEmbed()
                .setColor(client.color)
                .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
                .setDescription(content)
                .setTimestamp(deletedAt);

            message.channel.send({ embeds: [embed] });
        } else {
            message.channel.send('No deleted messages to snipe.');
        }
    },
};