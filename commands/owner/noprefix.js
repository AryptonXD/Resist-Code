const { createEmbed } = require('../../handler/commonUtils');
const { NoPrefixAccess } = require('../../owner.json');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

function getUser(message, args) {
  const user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.author;
  const ID = user.id;
  return { user, ID };
}

async function addUserToNoPrefixList(client, ID) {
  const nodata = createEmbed(client, ID, false, false);

  const data = await client.db4.get(`members_np`);
  if (!data) {
    await client.db4.set(`members_np`, { noprefixlist: [] });
    return nodata;
  } else {
    if (data.noprefixlist.includes(ID)) {
      return 'already_added';
    } else {
      await client.db4.push(`members_np.noprefixlist`, ID);
      return nodata;
    }
  }
}

async function removeUserFromNoPrefixList(client, ID) {
  const nodata = createEmbed(client, ID, false, false);

  const data = await client.db4.get(`members_np`);
  if (!data) {
    await client.db4.set(`members_np`, { noprefixlist: [] });
    return nodata;
  } else {
    if (!data.noprefixlist.includes(ID)) {
      return 'not_found';
    } else {
      await client.db4.pull(`members_np.noprefixlist`, ID);
      return nodata;
    }
  }
}

async function getNoPrefixList(client) {
  const data = await client.db4.get(`members_np`);
  if (!data || !data.noprefixlist || data.noprefixlist.length === 0) return [];
  return data.noprefixlist;
}

module.exports = {
  name: 'noprefix',
  aliases: ['np'],
  run: async (client, message, args) => {
    const subcommand = args[0];
    const { user, ID } = getUser(message, args);
    let prefix = await client.db8.get(`${message.guild.id}_prefix`);
    if (!prefix) prefix = Settings.bot.info.prefix;
    const arypton = await client.users.fetch(owner);

    const guide = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addField(`${emoji.util.arrow} ${prefix}noprefix add <user> all`, `Add a user to noprefix users for all servers.`)
      .addField(`${emoji.util.arrow} ${prefix}noprefix remove <user> all`, `Remove a user from noprefix users from all servers.`)
      .addField(`${emoji.util.arrow} ${prefix}noprefix show`, `Shows all the users in noprefix database.`)
      .addField(`${emoji.util.arrow} ${prefix}noprefix reset`, `Removes all the users from noprefix users from the database.`)
      .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

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

    if (!NoPrefixAccess.includes(message.author.id)) {
      return;
    }

    if (NoPrefixAccess.includes(message.author.id)) {
      if (!subcommand) {
        return message.channel.send({ embeds: [guide] });
      }

      switch (subcommand) {
        case 'add': {
          switch (args[2]) {
            case 'all': {
              if (!args[1]) {
                return message.channel.send(`${emoji.util.cross} | Provide a Member`);
              }

              const result = await addUserToNoPrefixList(client, ID);
              const userObject = await client.users.fetch(ID);
              if (result === 'already_added') {
                return message.channel.send(`${emoji.util.cross} | Already added no prefix to \`${userObject.username}\` for all guilds`);
              } else {
                return message.channel.send(`${emoji.util.tick} | Added no prefix to \`${userObject.username}\` for all guilds`);
              }
            }
          }
        }
          break;
        case 'remove': {
          switch (args[2]) {
            case 'all': {
              if (!args[1]) {
                return message.channel.send("Mention someone first.");
              }

              const result = await removeUserFromNoPrefixList(client, ID);
              const userObject = await client.users.fetch(ID);
              if (result === 'not_found') {
                return message.channel.send(`${emoji.util.cross} | Yet not having no prefix to \`${userObject.username}\` for all guilds`);
              } else {
                return message.channel.send(`${emoji.util.tick} | Removed no prefix from \`${userObject.username}\` for all guilds`);
              }
            }
          }
        }
          break;
        case 'show': {
          const listData = await getNoPrefixList(client);

          if (!listData || listData.length === 0) {
            return message.channel.send("Nothing to Show");
          }

          const totalPages = Math.ceil(listData.length / 10);

          const generateEmbed = async (currentPage) => {
            const startIndex = currentPage * 10;
            const endIndex = Math.min(startIndex + 10, listData.length);
            const currentMembers = listData.slice(startIndex, endIndex);

            const fetchUserPromises = currentMembers.map(async (userId, index) => {
              try {
                const user = await client.users.fetch(userId);
                if (!user) return `\`[${startIndex + index + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | User not found`;
                return `\`[${startIndex + index + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | [${user.username}](https://discord.com/users/${userId})`;
              } catch (error) {
                console.error(`Error fetching user ${userId}: ${error.message}`);
                return '';
              }
            });

            const memberList = (await Promise.all(fetchUserPromises)).join("\n");

            return memberList;
          };

          let currentPage = 0;
          const memberList = await generateEmbed(currentPage);

          const arypton = message.guild.members.cache.get(message.author.id);

          const embed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setTitle(`Total No Prefix Users - Page ${currentPage + 1}/${totalPages}`)
            .setDescription(memberList)
            .setFooter(`Made by ${arypton.user.username} with 💞`, `${arypton.user.displayAvatarURL({ dynamic: true })}`);

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

              const updatedEmbed = new MessageEmbed(embed)
                .setTitle(`Total No Prefix Users - Page ${currentPage + 1}/${totalPages}`)
                .setDescription(await generateEmbed(currentPage)); // Update the description

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

          break;
        }
        case 'reset': {
          const nodata = new MessageEmbed()
            .setColor(client.color)
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(`Please run the whitelist command again because earlier database was not set up.`);

          const data = await client.db4.get(`members_np`);
          if (!data) {
            await client.db4.set(`members_np`, { noprefixlist: [] });
            return message.channel.send({ embeds: [nodata] });
          } else {
            const users = data.noprefixlist;
            const mentions = [];

            if (users.length !== 0) {
              await client.db4.set(`members_np`, { noprefixlist: [] });
              return message.channel.send(`Reset Np database`);
            } else {
              return message.channel.send(`No one is in No Prefix Database`);
            }
          }

        }
        default: {
          message.channel.send({ embeds: [guide] });
        }
      }
    }
  }
};
