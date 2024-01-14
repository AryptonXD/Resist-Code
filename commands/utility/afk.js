const emoji = require('../../emoji.js');

module.exports = {
    name: 'afk',
    run: async (client, message, args) => {
        const data = await client.db13.get(`${message.author.id}_afk`);
        let afkReason = args.join(" ") || "I'm AFK ;-;";
        afkReason = sanitizeMentions(afkReason);
        const afkTime = Date.now();

        if (data) {
            return;
        } else {
            await client.db13.set(`${message.author.id}_afk`, {
                reason: afkReason,
                time: afkTime
            });
            return message.channel.send({ content: `**${message.author.tag}**, Your AFK is now set to: ${afkReason}`});
        }
    }
}

function sanitizeMentions(text) {
    return text.replace(/@(everyone|here|&[0-9]+)/g, '');
}
