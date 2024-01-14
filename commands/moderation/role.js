const emoji = require('../../emoji.js');

module.exports = {
    name: 'role',
    run: async (client, message, args) => {
        const role = message.guild.roles.cache.find((r) => r.name === args.slice(1).join(' ')) || message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        const executorHighestRole = message.member.roles.highest;

        switch (args[0]) {
            case 'humans':
                if (!role) return message.channel.send('Role not found.');

                const members = message.guild.members.cache.filter((member) => !member.user.bot);
                members.forEach((member) => {
                    member.roles.add(role);
                });

                message.channel.send(`Added the "${role.name}" role to all humans.`);
                break;

            case 'bots':
                const botRole = message.guild.roles.cache.find((r) => r.name === args.slice(1).join(' '));
                if (!botRole) return message.channel.send('Role not found.');

                if (botRole.comparePositionTo(executorHighestRole) >= 0 || botRole.comparePositionTo(message.guild.me.roles.highest) >= 0) {
                    return message.channel.send('You can\'t add a role higher or equal to your own or the bot\'s highest role.');
                }

                const botMembers = message.guild.members.cache.filter((member) => member.user.bot);
                botMembers.forEach((member) => {
                    member.roles.add(botRole);
                });

                message.channel.send(`Added the "${botRole.name}" role to all bots.`);
                break;

            case 'all':
                const allRole = message.guild.roles.cache.find((r) => r.name === args.slice(1).join(' '));
                if (!allRole) return message.channel.send('Role not found.');

                if (allRole.comparePositionTo(executorHighestRole) >= 0 || allRole.comparePositionTo(message.guild.me.roles.highest) >= 0) {
                    return message.channel.send('You can\'t add a role higher or equal to your own or the bot\'s highest role.');
                }

                const allMembers = message.guild.members.cache;
                allMembers.forEach((member) => {
                    member.roles.add(allRole);
                });

                message.channel.send(`Added the "${allRole.name}" role to all users.`);
                break;

            case 'status':
                message.channel.send('Role addition process status: ' + roleStatus.addingRole);
                break;

            case 'cancel':
                roleStatus.addingRole = false;
                message.channel.send('Role addition process canceled.');
                break;

            default:
                message.channel.send('Invalid sub-command. Usage: ?role [humans | bots | status | all | cancel] <role>');
        }
    },
};
