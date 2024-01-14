const { MessageEmbed } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
    name: 'invc',
    voteOnly: true,
    UserPerms: ['MANAGE_ROLES'],
    BotPerms: ['MANAGE_ROLES', 'EMBED_LINKS'],
    run: async (client, message, args) => {
        const prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        const arypton = await client.users.fetch(owner);

        const guide = new MessageEmbed()
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .addField(`${emoji.util.arrow} \`invc config\``, "Shows invc role settings for the server.")
            .addField(`${emoji.util.arrow} \`invc human <role>\``, "Setups invc human role settings for the server.")
            .addField(`${emoji.util.arrow} \`invc bot <role>\``, "Setups invc bot role settings for the server.")
            .addField(`${emoji.util.arrow} \`invc reset\``, "Resets invc role settings for the server.")
            .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

        switch (args[0]) {
            case 'config':
                const HumanRole = await client.db7.get(`invchumanrole_${message.guild.id}.HumanRole`) || "na";
                const BotRole = await client.db7.get(`invcbotrole_${message.guild.id}.BotRole`) || "na";

                let invcHumanRoleString;
                let invcBotRoleString;
                if (HumanRole === 'na') {
                    invcHumanRoleString = `\`Nothing To Show\``;
                } else {
                    const humanrole = message.guild.roles.cache.get(HumanRole);
                    invcHumanRoleString = humanrole ? `[1] | [${humanrole.id}](https://dsc.gg/resisthq) | \`${humanrole.name}\`` : `\`Invalid Role ID\``;
                }

                if (BotRole === 'na') {
                    invcBotRoleString = `\`Nothing To Show\``;
                } else {
                    const botrole = message.guild.roles.cache.get(BotRole);
                    invcBotRoleString = botrole ? `[1] | [${botrole.id}](https://dsc.gg/resisthq) | \`${botrole.name}\`` : `\`Invalid Role ID\``;
                }

                const embed = new MessageEmbed()
                    .setColor(client.color)
                    .setAuthor(client.user.tag, client.user.displayAvatarURL());

                if (invcHumanRoleString && invcHumanRoleString !== '') {
                    embed.addField(`InVC Humans Role`, invcHumanRoleString);
                }

                if (invcBotRoleString && invcBotRoleString !== '') {
                    embed.addField(`InVC Bot Role`, invcBotRoleString);
                }

                embed.setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

                await message.channel.send({ embeds: [embed] });
                break;
            case 'humans':
            case 'human':
                if (!role || !args[1]) {
                    await message.channel.send({ content: `${emoji.util.cross} | Provide a Role` });
                    return;
                }

                if (role.permissions.has("ADMINISTRATOR")) {
                    await message.channel.send({ content: `${emoji.util.cross} | \`ADMINISTRATOR\` Role cannot be Selected` });
                    return;
                }

                await client.db7.set(`invchumanrole_${message.guild.id}.HumanRole`, role.id);
                await client.db7.set(`invcroleguild_${message.guild.id}.Guild`, message.guild.id);
                await message.channel.send({ content: `${emoji.util.tick} | Successfully added \`${role.name}\` as invc human Role` });
                break;
            case 'bots':
            case 'bot':
                if (!role || !args[1]) {
                    await message.channel.send({ content: `${emoji.util.cross} | Provide a Role` });
                    return;
                }

                if (role.permissions.has("ADMINISTRATOR")) {
                    await message.channel.send({ content: `${emoji.util.cross} | \`ADMINISTRATOR\` Role cannot be Selected` });
                    return;
                }

                await client.db7.set(`invcbotrole_${message.guild.id}.BotRole`, role.id);
                await client.db7.set(`invcroleguild_${message.guild.id}.Guild`, message.guild.id);
                await message.channel.send({ content: `${emoji.util.tick} | Successfully added \`${role.name}\` as invc bot Role` });
                break;
            case 'reset':
                const promises = [
                    client.db7.delete(`invchumanrole_${message.guild.id}`),
                    client.db7.delete(`invcroleguild_${message.guild.id}.Guild`),
                    client.db7.delete(`invcbotrole_${message.guild.id}`),
                ];

                await Promise.all(promises);

                await message.channel.send(`InVC roles have been reset for this server.`);
                break;

            default:
                await message.channel.send({ embeds: [guide] });
                break;
        }
    }
}
