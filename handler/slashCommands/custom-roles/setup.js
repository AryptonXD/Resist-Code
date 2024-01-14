const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const Settings = require('../../settings.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Displays custom role settings for the server.')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('Select a setup option.')
                .setRequired(false)
                .addChoice('reqrole', 'reqrole')
                .addChoice('admin', 'admin')
                .addChoice('official', 'official')
                .addChoice('guest', 'guest')
                .addChoice('girl', 'girl')
                .addChoice('friend', 'friend')
                .addChoice('vip', 'vip')
                .addChoice('reset', 'reset')
                .addChoice('config', 'config'))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Select the role to set up.')
                .setRequired(false)),
    async execute(client, interaction) {
        const prefix = await getPrefix(client, interaction);
        const arypton = await client.users.fetch(owner);
        const option = interaction.options.getString('option');
        const role = interaction.options.getRole('role');
        
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) &&
            interaction.user.id !== interaction.guild.ownerId) {
            const embed = new MessageEmbed()
                .setDescription("You don't have permission to use this command.")
                .setColor(client.color);
            interaction.reply({ embeds: [embed] });
            return;
        }

        if (!option) {
            const guide = createGuideEmbed(client, prefix, arypton);
            interaction.reply({ embeds: [guide] });
            return;
        } else {
            switch (option) {
                case 'reqrole':
                case 'admin':
                case 'official':
                case 'guest':
                case 'girl':
                case 'friend':
                case 'vip':
                    await handleRoleCommand(client, interaction, option, role);
                    break;
                case 'reset':
                    await handleResetCommand(client, interaction);
                    break;
                case 'config':
                    await handleConfigCommand(client, interaction);
                    break;
                default:
                    const guide = createGuideEmbed(client, prefix);
                    interaction.reply({ embeds: [guide] });
                    break;
            }
        }
    },
};

async function handleRoleCommand(client, interaction, roleType, selectedRole) {
    if (!selectedRole) {
        const embed = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setDescription("<:cross:1132996452218585209> | Role is missing in your argument.")
            .setColor(client.color);
        interaction.reply({ embeds: [embed] });
        return;
    }

    const permissions = ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'BAN_MEMBERS', 'KICK_MEMBERS'];
    if (permissions.some(p => selectedRole.permissions.has(p))) {
        const embed = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setDescription("<:cross:1132996452218585209> | The mentioned role cannot be selected because it has dangerous permissions.")
            .setColor(client.color);
        interaction.reply({ embeds: [embed] });
        return;
    }

    await client.db3.set(`${roleType}_${interaction.guild.id}`, selectedRole.id);

    const embed = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`<:tick:1132996565049552947> | Successfully added ${selectedRole} as the ${roleType} role.`)
        .setColor(client.color);

    interaction.reply({ embeds: [embed] });
}

async function getPrefix(client, interaction) {
  let prefix = await client.db8.get(`${interaction.guild.id}_prefix`);
  if (!prefix) prefix = Settings.bot.info.prefix;
  return prefix;
}

function createGuideEmbed(client, prefix, arypton) {
  const guide = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.color)
    .addField(`<a:arrow_right:1133392521297399960> \`setup config\``, "Displays custom role settings for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup reset\``, "Resets custom role settings for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup reqrole <role mention/id>\``, "Sets up a required role for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup admin <role mention/id>\``, "Sets up an admin role for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup official <role mention/id>\``, "Sets up an official role for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup guest <role mention/id>\``, "Sets up a guest role for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup girl <role mention/id>\``, "Sets up a girl role for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup friend <role mention/id>\``, "Sets up a friend role for the server.")
    .addField(`<a:arrow_right:1133392521297399960> \`setup vip <role mention/id>\``, "Sets up a VIP role for the server.")
    .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

  return guide;
}

async function handleRoleCommand(client, interaction, roleType) {
  const role = interaction.options.getRole('role');
  if (!role) {
    const embed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription("<:cross:1132996452218585209> | Role is missing in your argument.")
      .setColor(client.color);
    interaction.reply({ embeds: [embed] });
    return;
  }

  const permissions = ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'BAN_MEMBERS', 'KICK_MEMBERS'];
  if (permissions.some(p => role.permissions.has(p))) {
    const embed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription("<:cross:1132996452218585209> | The mentioned role cannot be selected because it has dangerous permissions.")
      .setColor(client.color);
    interaction.reply({ embeds: [embed] });
    return;
  }

  await client.db3.set(`${roleType}_${interaction.guild.id}`, role.id);

  const embed = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`<:tick:1132996565049552947> | Successfully added ${role} as the ${roleType} role.`)
    .setColor(client.color);

  interaction.reply({ embeds: [embed] });
}

async function handleResetCommand(client, interaction) {
  const roleKeys = ['reqrole', 'admin', 'official', 'guest', 'girl', 'friend', 'vip'];
  const guildId = interaction.guild.id;

  try {
    for (const key of roleKeys) {
      await client.db3.delete(`${key}_${guildId}`);
    }

    const embed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<:tick:1132996565049552947> | Custom role settings have been reset.`)
      .setColor(client.color);

    interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Error while resetting custom role settings:", error);
    const embed = new MessageEmbed()
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<:cross:1132996452218585209> | An error occurred while resetting custom role settings.`)
      .setColor(client.color);

    interaction.reply({ embeds: [embed] });
  }
}

async function handleConfigCommand(client, interaction) {
  const roleKeys = ['reqrole', 'admin', 'official', 'guest', 'girl', 'friend', 'vip'];
  const roles = await Promise.all(roleKeys.map(async (key) => {
    const roleId = await client.db3.get(`${key}_${interaction.guild.id}`) || "na";
    const role = roleId === "na" ? "`Nothing To Show`" : `<@&${roleId}>`;
    return role;
  }));

  const embed = new MessageEmbed()
    .setColor(client.color)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle("Custom Role Settings for this Server")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("<a:arrow_right:1133392521297399960> Required Role", roles[0])
    .addField("<a:arrow_right:1133392521297399960> Admin Role", roles[1])
    .addField("<a:arrow_right:1133392521297399960> Official Role", roles[2])
    .addField("<a:arrow_right:1133392521297399960> Guest Role", roles[3])
    .addField("<a:arrow_right:1133392521297399960> Girl Role", roles[4])
    .addField("<a:arrow_right:1133392521297399960> Friend Role", roles[5])
    .addField("<a:arrow_right:1133392521297399960> VIP Role", roles[6]);

  interaction.reply({ embeds: [embed] });
}
