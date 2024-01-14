const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
    name: "autorole",
    aliases: ['ar'],
    voteOnly: true,
    UserPerms: ['ADMINISTRATOR'],
    BotPerms: ['EMBED_LINKS', 'MANAGE_ROLES'],
    run: async (client, message, args) => {
        const roleMention = message.mentions.roles.first();
        const roleID = args[2];
        const role = roleMention || message.guild.roles.cache.get(roleID);
        const arypton = await client.users.fetch(owner);

        const dbKey = `${message.guild.id}_autorole`;
        let data = await client.db1.get(dbKey);
        if (!data) {
            await client.db1.set(dbKey, { role: { humans: [], bots: [] } });
            data = { role: { humans: [], bots: [] } };
        }

        switch (args[0]) {
            case "humans":
                handleRole(args, "humans", data.role.humans, role, message, client);
                break;

            case "bots":
                handleRole(args, "bots", data.role.bots, role, message, client);
                break;

            case "config":
                displayConfig(message, data, client, arypton);
                break;

            case "reset":
                resetAutorole(data, message, client);
                break;

            default:
                let prefix = await client.db8.get(`${message.guild.id}_prefix`);
                if (!prefix) prefix = Settings.bot.info.prefix;
                const guideEmbed = createAutoroleGuideEmbed(client, prefix, arypton);
                message.channel.send({ embeds: [guideEmbed] });
                break;
        }
    }
}

async function handleRole(args, type, autorole, role, message, client) {
    const premium = await client.db12.get(`${message.guild.id}_premium`);
    let limit;

    if (premium.active === true) {
        limit = 10;
    } else {
        limit = 2;
    }

    switch (args[1]) {
        case "add":
            if (!role) {
                return sendRoleMissingEmbed(message, client);
            }

            if (role.permissions.has("ADMINISTRATOR")) {
                return sendAdminRoleEmbed(message, client);
            }

            if (autorole.includes(role.id)) {
                return sendRoleAlreadyAddedEmbed(message, role, type, client);
            }

            if (autorole.length >= limit) {
                if (limit === 10) {
                    const maxRolesReachedEmbeds = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor(client.user.tag, client.user.displayAvatarURL())
                        .setDescription(`${emoji.util.cross} | Maximum number Autorole Additionof ${type} roles (10) with premium.`);
                    return message.channel.send({ embeds: [maxRolesReachedEmbeds] });
                } else {
                    return sendMaxRolesReachedEmbed(message, type, client);
                }
            }

            autorole.push(role.id);
            await client.db1.set(`${message.guild.id}_autorole.role.${type}`, autorole);
            return sendRoleAddedEmbed(message, role, type, client);

        case "remove":
            if (!role) {
                return sendRoleMissingEmbed(message, client);
            }

            if (role.permissions.has("ADMINISTRATOR")) {
                return sendAdminRoleEmbed(message, client);
            }

            if (!autorole.includes(role.id)) {
                return sendRoleNotInListEmbed(message, role, type, client);
            } else {
                autorole = autorole.filter(id => id !== role.id);
                await client.db1.set(`${message.guild.id}_autorole.role.${type}`, autorole);
                return sendRoleRemovedEmbed(message, role, type, client);
            }
    }
}


function sendRoleMissingEmbed(message, client) {
    const roleMissingEmbed = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | Please mention a role or provide a valid role ID.`)
        .setColor(client.color);
    return message.channel.send({ embeds: [roleMissingEmbed] });
}

function sendAdminRoleEmbed(message, client) {
    const adminRoleEmbed = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.corss} | The ADMINISTRATOR role cannot be selected.`)
        .setColor(client.color);
    return message.channel.send({ embeds: [adminRoleEmbed] });
}

function sendRoleAlreadyAddedEmbed(message, role, type, client) {
    const roleAlreadyAddedEmbed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | ${role} is already in Autorole ${type.charAt(0).toUpperCase() + type.slice(1)} List`);
    return message.channel.send({ embeds: [roleAlreadyAddedEmbed] });
}

function sendRoleAddedEmbed(message, role, type, client) {
    const roleAddedEmbed = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Added ${role} to autorole ${type.charAt(0).toUpperCase() + type.slice(1)}.`)
        .setColor(client.color);
    return message.channel.send({ embeds: [roleAddedEmbed] });
}

function sendRoleNotInListEmbed(message, role, type, client) {
    const roleNotInListEmbed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | ${role} is not in Autorole ${type.charAt(0).toUpperCase() + type.slice(1)} List`);
    return message.channel.send({ embeds: [roleNotInListEmbed] });
}

function sendRoleRemovedEmbed(message, role, type, client) {
    const roleRemovedEmbed = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Removed ${role} from autorole ${type.charAt(0).toUpperCase() + type.slice(1)}.`)
        .setColor(client.color);
    return message.channel.send({ embeds: [roleRemovedEmbed] });
}

function sendMaxRolesReachedEmbed(message, type, client) {
    const maxRolesReachedEmbed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | Maximum number of ${type} roles (2) reached | With our premium subscription, you can enjoy an impressive whitelist addition limit of up to 10.`);
    return message.channel.send({ embeds: [maxRolesReachedEmbed] });
}

async function resetAutorole(data, message, client) {
    data.role.humans = [];
    data.role.bots = [];

    await client.db1.set(`${message.guild.id}_autorole`, { role: { humans: [], bots: [] } });

    const resetEmbed = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | AutoRole configuration has been reset.`)
        .setColor(client.color);

    message.channel.send({ embeds: [resetEmbed] });
}

function createAutoroleGuideEmbed(client, prefix, arypton) {
    const guide = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(client.color)
        .addField(`${emoji.util.arrow} \`${prefix}autorole humans add <role mention/id>\``, "Add a role to the autorole list for humans.")
        .addField(`${emoji.util.arrow} \`${prefix}autorole humans remove <role mention/id>\``, "Remove a role from the autorole list for humans.")
        .addField(`${emoji.util.arrow} \`${prefix}autorole bots add <role mention/id>\``, "Add a role to the autorole list for bots.")
        .addField(`${emoji.util.arrow} \`${prefix}autorole bots remove <role mention/id>\``, "Remove a role from the autorole list for bots.")
        .addField(`${emoji.util.arrow} \`${prefix}autorole config\``, "Display the current autorole configuration.")
        .addField(`${emoji.util.arrow} \`${prefix}autorole reset\``, "Reset the autorole configuration.")
        .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

    return guide;
}

async function displayConfig(message, data, client, arypton) {
    const humanRole = data.role.humans || "Nothing to Show";
    const botRole = data.role.bots || "Nothing to Show";

    const itemsPerPage = 10;
    const totalPages = Math.ceil(humanRole.length / itemsPerPage) || Math.ceil(botRole.length / itemsPerPage);
    let currentPage = 0;

    function generateEmbed(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, humanRole.length);
        const endIndex1 = Math.min(startIndex + itemsPerPage, botRole.length);
        const currentHumanRoles = humanRole.slice(startIndex, endIndex);
        const currentBotRoles = botRole.slice(startIndex, endIndex1);
        const roleMention = [];
        const roleMention1 = [];

        currentHumanRoles.forEach((roleId, i) => {
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                roleMention.push(`\`[${startIndex + i + 1}]\` | ID: [${roleId}](https://dsg.gg/resisthq) | <@&${roleId}>`);
            } else {
                roleMention.push(`\`[${startIndex + i + 1}]\` | ID: [${roleId}](https://dsg.gg/resisthq) | Deleted Role`);
            }
        });

        currentBotRoles.forEach((roleId, i) => {
            const role = message.guild.roles.cache.get(roleId);
            if (role) {
                roleMention1.push(`\`[${startIndex + i + 1}]\` | ID: [${roleId}](https://dsg.gg/resisthq) | <@&${roleId}>`);
            } else {
                roleMention1.push(`\`[${startIndex + i + 1}]\` | ID: [${roleId}](https://dsg.gg/resisthq) | Deleted Role`);
            }
        });

        const wlistembed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setTitle(`AutoRole Config - Page ${currentPage + 1}/${totalPages}`);

        if (roleMention.length > 0) {
            wlistembed.addField("AutoRole Humans", roleMention.join('\n'));
        } else {
            wlistembed.addField("AutoRole Humans", "No roles to display");
        }

        if (roleMention1.length > 0) {
            wlistembed.addField("AutoRole Bots", roleMention1.join('\n'));
        } else {
            wlistembed.addField("AutoRole Bots", "No roles to display");
        }

        wlistembed.setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

        return wlistembed;
    }

    const embed = generateEmbed(currentPage);

    const pag = new MessageActionRow().addComponents(
        new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId("first")
            .setLabel("≪")
            .setDisabled(true),
        new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId("previous")
            .setLabel("Previous")
            .setDisabled(true),
        new MessageButton()
            .setStyle("DANGER")
            .setCustomId("close")
            .setLabel("Close"),
        new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId("next")
            .setLabel("Next"),
        new MessageButton()
            .setStyle("PRIMARY")
            .setCustomId("last")
            .setLabel("≫")
            .setDisabled(false)
    );

    if (totalPages === 1) {
        pag.components.forEach((button) => {
            button.setDisabled(true);
        });
    }

    const messageComponent = await message.channel.send({ embeds: [embed], components: [pag] });

    const collector = messageComponent.createMessageComponentCollector({
        filter: (interaction) => interaction.user.id === message.author.id,
        time: 200000,
        idle: 300000 / 2,
    });

    collector.on("collect", async (interaction) => {
        if (interaction.isButton()) {
            if (interaction.customId === "next") {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                }
            } else if (interaction.customId === "previous") {
                if (currentPage > 0) {
                    currentPage--;
                }
            } else if (interaction.customId === "first") {
                currentPage = 0;
            } else if (interaction.customId === "last") {
                currentPage = totalPages - 1;
            } else if (interaction.customId === "close") {
                messageComponent.delete().catch((error) => {
                    console.error("Failed to delete message:", error);
                });
                return;
            }

            const updatedEmbed = generateEmbed(currentPage);

            const firstButton = pag.components.find((component) => component.customId === "first");
            const previousButton = pag.components.find((component) => component.customId === "previous");
            const nextButton = pag.components.find((component) => component.customId === "next");
            const lastButton = pag.components.find((component) => component.customId === "last");

            firstButton.setDisabled(currentPage === 0);
            previousButton.setDisabled(currentPage === 0);
            nextButton.setDisabled(currentPage === totalPages - 1);
            lastButton.setDisabled(currentPage === totalPages - 1);

            interaction.update({ embeds: [updatedEmbed], components: [pag] });
        }
    });

    collector.on("end", () => {
        pag.components.forEach((button) => button.setDisabled(true));
        messageComponent.edit({ components: [pag] });
    });
}
