const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = require('../index.js');

const roleData = {
  'Notifications': [
    { name: 'Announcement', id: '1139937079841792100' },
    { name: 'Updates', id: '1139937080328323287' },
  ],
  'Languages': [
    { name: 'Python', id: '1139937081695686677' },
    { name: 'Javascript', id: '1139937082538721421' },
    { name: 'Java', id: '1139937083922862180' },
    { name: 'C++', id: '1139937084371644548' },
    { name: 'HTML', id: '1139937085416022118' },
  ],
  'Age': [
    { name: 'Above 18', id: '1139937086808522862' },
    { name: 'Below 18', id: '1139937088087793675' },
  ],
  'Gender': [
      { name: 'Male', id: '1139937089685815306' },
      { name: 'Female', id: '1139937090981859389' },
      { name: 'Others', id: '1139937092063997992' },
    ],
};

const roles = {};
const messageCache = new Map();

client.on('messageCreate', async (message) => {
  if (message.guild.id !== `1052124710080630824`) return;
  if (message.content === '!rolesuybeaisgijjifwhifbarbvtbvuegbceijbicvberbgthuebvrhbvhtsbrivbcerbrvtacijwbvb5') {
    const guild = message.guild;
    const embeds = [];

    for (const category in roleData) {
      const categoryRoles = roleData[category];

      await Promise.all(
        categoryRoles.map(async (role) => {
          const fetchedRole = guild.roles.cache.get(role.id);
          if (fetchedRole) {
            role.memberCount = fetchedRole.members.size;
          }
        })
      );

      const roleButtons = categoryRoles.map((role) => {
        return new MessageButton()
          .setCustomId(role.id)
          .setLabel(`${role.name} - ${role.memberCount}`)
          .setStyle('SECONDARY');
      });
        
      const buttonActionRows = [];
      while (roleButtons.length > 0) {
        const rowButtons = roleButtons.splice(0, 5);
        const buttonActionRow = new MessageActionRow().addComponents(rowButtons);
        buttonActionRows.push(buttonActionRow);
      }

      const embed = new MessageEmbed()
        .setColor('2f3136')
        .setAuthor(`${guild.name}`, `${guild.iconURL({ dynamic: true })}`)
        .setDescription(`**${category}**\n${categoryRoles.map(role => `◦•≫ <@&${role.id}>`).join('\n')}`)
        .setImage('https://media.discordapp.net/attachments/1069907374950850622/1083380760578367579/rainb2.gif')
        .setFooter(`Select your ${category} Role`, `${guild.iconURL({ dynamic: true })}`);

      embeds.push({ embeds: [embed], components: buttonActionRows });
    }

    for (const embed of embeds) {
      const sentMessage = await message.channel.send(embed);
      for (const component of embed.components[0].components) {
        component.interactionID = sentMessage.id;
      }
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const selectedRoleID = interaction.customId;
  const selectedRole = findRoleByID(selectedRoleID);

  if (selectedRole) {
    const member = interaction.member;
    if (member) {
      const guild = interaction.guild;
      const roleToAdd = guild.roles.cache.get(selectedRoleID);
      if (roleToAdd) {
        try {
          const hasRole = member.roles.cache.has(selectedRoleID);
          if (hasRole) {
            await member.roles.remove(roleToAdd);
            await interaction.reply({ ephemeral: true, content: `Removed <@&${selectedRoleID}> from <@${member.user.id}>` });
          } else {
            await member.roles.add(roleToAdd);
            await interaction.reply({ ephemeral: true, content: `Added <@&${selectedRoleID}> to <@${member.user.id}>` });
          }

          const updatedRole = guild.roles.cache.get(selectedRoleID);
          if (updatedRole) {
            selectedRole.memberCount = updatedRole.members.size;
          }

          const buttonLabel = `${selectedRole.name} - ${selectedRole.memberCount}`;

          interaction.message.components = interaction.message.components.map((actionRow) => {
            return new MessageActionRow()
              .addComponents(
                actionRow.components.map((btn) => {
                  if (btn.customId === selectedRoleID) {
                    return btn.setLabel(buttonLabel);
                  }
                  return btn;
                })
              );
          });

          await interaction.message.edit({ content: ' ', components: interaction.message.components });

        } catch (error) {
          console.error(`Failed to modify roles for ${member.user.tag}:`, error);
          await interaction.reply({ ephemeral: true, content: 'An error occurred while modifying roles.' });
        }
      } else {
        await interaction.reply({ ephemeral: true, content: 'The role could not be found.' });
      }
    }
  }
});

client.on('guildMemberUpdate', async (_, newMember) => {
  const memberRoles = newMember.roles.cache.filter((role) => findRoleByID(role.id));
  memberRoles.forEach((role) => {
    const updatedRole = newMember.guild.roles.cache.get(role.id);
    if (updatedRole) {
      const selectedRole = findRoleByID(role.id);
      if (selectedRole) {
        selectedRole.memberCount = updatedRole.members.size;
        const buttonLabel = `${selectedRole.name} - ${selectedRole.memberCount}`;
        updateButtonLabel(role.id, buttonLabel);

        const cachedMessage = messageCache.get(selectedRole.interactionID);
        if (cachedMessage) {
          const components = cachedMessage.components.map((actionRow) => ({
            type: actionRow.type,
            components: actionRow.components.map((btn) => btn.toJSON()),
          }));
          cachedMessage.edit({ content: ' ', components });
        }
      }
    }
  });
});

function findRoleByID(roleID) {
  for (const category in roleData) {
    const categoryRoles = roleData[category];
    const foundRole = categoryRoles.find((role) => role.id === roleID);
    if (foundRole) {
      return foundRole;
    }
  }
  return null;
}

function updateButtonLabel(roleID, label) {
  for (const category in roleData) {
    const categoryRoles = roleData[category];
    for (const role of categoryRoles) {
      if (role.id === roleID) {
        role.label = label;
        return;
      }
    }
  }
}
