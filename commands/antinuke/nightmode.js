const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'nightmode',
  voteOnly: true,
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS'],
  run: async (client, message, args) => {
    const prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[2]) || message.author;
    const arypton = await client.users.fetch(owner);
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || 'unfined';
    const premium = await client.db12.get(`${message.guild.id}_premium`);
    const nightmode = await client.db15.get(`${message.guild.id}_nightmodeSettings`);
    let roleLimit;
    let bypassLimit;

    if (premium.active === true) {
      roleLimit = 100;
      bypassLimit = 100;
    } else {
      roleLimit = 3;
      bypassLimit = 3;
    }

    const createEmbed = (title, description) => {
      return new MessageEmbed()
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(description)
        .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));
    };

    const embeds = {
      mentionrole: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`Mention Role First`),

      mentionsomeone: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`Mention Someone First`),

      alblist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | Already added <@&${role.id}> in nightmode roles for this guild.`),

      blist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Added <@&${role.id}> in nightmode roles for this guild.`),

      remblist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | <@&${role.id}> is Removed from nightmode roles for this guild.`),

      noblist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | <@&${role.id}> Yet not added in nightmode roles for this guild.`),

      alblist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | Already added <@${user.id}> in nightmode bypass for this guild.`),

      blist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Added <@${user.id}> in nightmode bypass for this guild.`),

      remblist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | <@${user.id}> is Removed from nightmode bypass for this guild.`),

      noblist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | <@${user.id}> Yet not added in nightmode bypass for this guild.`),

      onkrle: new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Prior to utilizing this command, it is necessary to activate Nightmode.`),

      guide: new MessageEmbed()
        .setColor(client.color)
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`${emoji.util.arrow} \`${prefix}nightmode\``, `Shows the guide embed for the module .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode enable\``, `Enables the nightmode module settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode disable\``, `Disables the nightmode module settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode role add <role mention/id>\``, `Add the role in nightmode roles .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode bypass add <user mention/id>\``, `Add the user in nightmode bypass .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode role remove <role mention/id>\``, `Remove the role from nightmode roles .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode bypass remove <user mention/id>\``, `Remove the user from nightmode bypass .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode role show\``, `Show nightmode role module settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode bypass show\``, `Show nightmode bypass module settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode role reset\``, `Resets nightmode role settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}nightmode bypass reset\``, `Resets nightmode bypass settings for the server .`)
        .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`)
    };

    await handleNightmodeCommand(client, message, args);

    async function handleNightmodeCommand(client, message, args) {
      const option = args[0];
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[2]) || message.author;

      switch (option) {
        case "enable":
          if (nightmode) {
            const eeeee = createEmbed("Nightmode Settings", `Ohh uh! looks like your server has already enabled Nightmode Settings.\nCurrent Status : ${emoji.util.disabler}${emoji.util.enabled}`);
            message.channel.send({ embeds: [eeeee] });
          } else {
            await client.db15.set(`${message.guild.id}_nightmodeSettings`, true);
            await client.db15.set(`${message.guild.id}_nightmodeGuild`, message.guild.id);
            const eeee = createEmbed("Nightmode Settings", `Successfully enabled Nightmode Settings.\nCurrent Status : ${emoji.util.disabler}${emoji.util.enabled}`);
            message.channel.send({ embeds: [eeee] });
          }
          break;
        case "disable":
          if (!nightmode) {
            const ddddd = createEmbed("Nightmode Settings", `Ohh uh! looks like your server has already disabled Nightmode Settings.\nCurrent Status : ${emoji.util.disabled}${emoji.util.enabler}`);
            message.channel.send({ embeds: [ddddd] });
          } else {
            await client.db15.delete(`${message.guild.id}_nightmodeSettings`);
            await client.db15.delete(`${message.guild.id}_nightmodeGuild`);
            const dddd = createEmbed("Nightmode Settings", `Successfully disabled Nightmode Settings.\nCurrent Status : ${emoji.util.disabled}${emoji.util.enabler}`);
            message.channel.send({ embeds: [dddd] });
          }
          break;
        case 'role':
          if (args[1] === 'add') {
            await handleAddRole(client, message, role);
          } else if (args[1] === 'remove') {
            await handleRemoveRole(client, message, role);
          } else if (args[1] === 'show') {
            await handleRoleConfig(client, message);
          } else if (args[1] === 'reset') {
            await handleRoleReset(client, message);
          }
          break;
        case 'bypass':
          if (args[1] === 'add') {
            await handleAddBypass(client, message, user);
          } else if (args[1] === 'remove') {
            await handleRemoveBypass(client, message, user);
          } else if (args[1] === 'show') {
            await handleBypassConfig(client, message);
          } else if (args[1] === 'reset') {
            await handleBypassReset(client, message);
          }
          break;
        default:
          return message.channel.send({ embeds: [embeds.guide] });
      }
    }

    async function handleAddRole(client, message, role) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionrole] });
          }
          if (!role) {
            return message.channel.send({ embeds: [embeds.mentionrole] });
          } else {
            if (data.nightmoderoleslist.includes(role.id)) {
              return message.channel.send({ embeds: [embeds.alblist] });
            }
            if (data.nightmoderoleslist.length >= roleLimit) {
              if (roleLimit === 100) {
                return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive Nightmode Role Addition limit of up to 100.`);
              } else {
                return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced Nightmode Role Addition limit of up to 100. Without premium, the maximum Nightmode Role Addition limit is restricted to 5. Unlock the potential for unlimited Nightmode Role Additions by opting for our Premium subscription.`);
              }
            } else {
              await client.db15.push(`${message.guild.id}_nightmode.nightmoderoleslist`, role.id);
              return message.channel.send({ embeds: [embeds.blist] });
            }
          }
        }
      });
    }

    async function handleRemoveRole(client, message, role) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionrole] });
          }
          if (!role) {
            return message.channel.send({ embeds: [embeds.mentionrole] });
          } else {
            if (!data.nightmoderoleslist.includes(role.id)) {
              return message.channel.send({ embeds: [embeds.noblist] });
            } else {
              await client.db15.pull(`${message.guild.id}_nightmode.nightmoderoleslist`, role.id);
              return message.channel.send({ embeds: [embeds.remblist] });
            }
          }
        }
      });
    }

    async function handleRoleConfig(client, message) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const roles = data.nightmoderoleslist;

          if (roles.length === 0) {
            return message.channel.send(`No roles are in nightmode roles Database`);
          }

          const itemsPerPage = 10;
          const totalPages = Math.ceil(roles.length / itemsPerPage);
          let currentPage = 0;

          const generateEmbed = (page) => {
            const startIndex = page * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, roles.length);
            const currentRoles = roles.slice(startIndex, endIndex);
            const mentions = [];

            currentRoles.forEach((roleId, i) => {
              const role = message.guild.roles.cache.get(roleId);
              if (role) {
                mentions.push(`\`[${startIndex + i + 1}]\` | ID: [${roleId}](https://dsc.gg/iresist) | <@&${roleId}>`);
              }
            });

            const configEmbed = new MessageEmbed()
              .setColor(client.color)
              .setAuthor(client.user.tag, client.user.displayAvatarURL())
              .setTitle(`Total Nightmode Roles - Page ${currentPage + 1}/${totalPages}`)
              .setDescription(mentions.join('\n'))
              .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

            return configEmbed;
          };

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
              .setLabel("Close")
              .setDisabled(false),
            new MessageButton()
              .setStyle("SUCCESS")
              .setCustomId("next")
              .setLabel("Next")
              .setDisabled(false),
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
            filter: (interaction) => {
              if (message.author.id === interaction.user.id) return true;
              else {
                return interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true });
              }
            },
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
      });
    }

    async function handleRoleReset(client, message) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const users = data.nightmoderoleslist;
          if (users.length !== 0) {
            await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
            return message.channel.send(`Reseted nightmode roles database`);
          } else {
            return message.channel.send(`No roles are in nightmode roles Database`);
          }
        }
      });
    }

    async function handleAddBypass(client, message, user) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          }
          if (!user) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          } else {
            if (data.nightmodebypasslist.includes(user.id)) {
              return message.channel.send({ embeds: [embeds.alblist1] });
            }
            if (data.nightmodebypasslist.length >= bypassLimit) {
              if (bypassLimit === 100) {
                return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive Nightmode Bypass Addition limit of up to 100.`);
              } else {
                return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced Nightmode Bypass Addition limit of up to 100. Without premium, the maximum Nightmode Bypass Addition limit is restricted to 5. Unlock the potential for unlimited Nightmode Bypass Additions by opting for our Premium subscription.`);
              }
            } else {
              await client.db15.push(`${message.guild.id}_nightmode.nightmodebypasslist`, user.id);
              return message.channel.send({ embeds: [embeds.blist1] });
            }
          }
        }
      });
    }

    async function handleRemoveBypass(client, message, user) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          }
          if (!user) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          } else {
            if (!data.nightmodebypasslist.includes(user.id)) {
              return message.channel.send({ embeds: [embeds.noblist1] });
            } else {
              await client.db15.pull(`${message.guild.id}_nightmode.nightmodebypasslist`, user.id);
              return message.channel.send({ embeds: [embeds.remblist1] });
            }
          }
        }
      });
    }

    async function handleBypassConfig(client, message) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const bypassUsers = data.nightmodebypasslist;

          if (bypassUsers.length === 0) {
            return message.channel.send(`No users are in nightmode bypass Database`);
          }

          const itemsPerPage = 10;
          const totalPages = Math.ceil(bypassUsers.length / itemsPerPage);
          let currentPage = 0;

          const generateEmbed = (page) => {
            const startIndex = page * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, bypassUsers.length);
            const currentBypass = bypassUsers.slice(startIndex, endIndex);
            const mentions = [];

            currentBypass.forEach((userId, i) => {
              const member = message.guild.members.cache.get(userId);
              if (member) {
                mentions.push(`\`[${startIndex + i + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | <@${userId}>`);
              }
            });

            const configEmbed = new MessageEmbed()
              .setColor(client.color)
              .setAuthor(client.user.tag, client.user.displayAvatarURL())
              .setTitle(`Total nightmode bypass - Page ${currentPage + 1}/${totalPages}`)
              .setDescription(mentions.join('\n'))
              .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

            return configEmbed;
          };

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
              .setLabel("Close")
              .setDisabled(false),
            new MessageButton()
              .setStyle("SUCCESS")
              .setCustomId("next")
              .setLabel("Next")
              .setDisabled(false),
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
            filter: (interaction) => {
              if (message.author.id === interaction.user.id) return true;
              else {
                return interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true });
              }
            },
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
      });
    }

    async function handleBypassReset(client, message) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the nightmode command again because earlier database was not set up.`);

      await client.db15.get(`${message.guild.id}_nightmode`).then(async (data) => {
        if (!data) {
          await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const users = data.nightmodebypasslist;
          if (users.length !== 0) {
            await client.db15.set(`${message.guild.id}_nightmode`, { nightmoderoleslist: [], nightmodebypasslist: [] });
            return message.channel.send(`Reseted nightmode bypass database`);
          } else {
            return message.channel.send(`No users are in nightmode bypass Database`);
          }
        }
      });
    }
  }
};
