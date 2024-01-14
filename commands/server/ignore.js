const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'ignore',
  voteOnly: true,
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS'],
  run: async (client, message, args) => {
    const prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const arypton = await client.users.fetch(owner);
    const user = message.guild.members.cache.get(args[2]) || message.mentions.members.first() || message.author;
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.channel;
    const premium = await client.db12.get(`${message.guild.id}_premium`);
    let channelLimit;
    let bypassLimit;

    if (premium.active === true) {
      channelLimit = 100;
      bypassLimit = 100;
    } else {
      channelLimit = 5;
      bypassLimit = 10
    }

    const embeds = {
      mentionchannel: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`Mention Channel First`),

      mentionsomeone: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`Mention Someone First`),

      alblist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | Already added <#${channel.id}> in ignore channel for this guild.`),

      blist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Added <#${channel.id}> in ignore channel for this guild.`),

      remblist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | <#${channel.id}> is Removed from ignore channel for this guild.`),

      noblist: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | <#${channel.id}> Yet not added in ignore channel for this guild.`),

      alblist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | Already added <@${user.id}> in ignore bypass for this guild.`),

      blist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Added <@${user.id}> in ignore bypass for this guild.`),

      remblist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | <@${user.id}> is Removed from ignore bypass for this guild.`),

      noblist1: new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.cross} | <@${user.id}> Yet not added in ignore bypass for this guild.`),

      guide: new MessageEmbed()
        .setColor(client.color)
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`${emoji.util.arrow} \`${prefix}ignore\``, `Shows the guide embed for the module .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore channel add <channel>\``, `Add the channel in ignore channels .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore bypass add <user mention/id>\``, `Add the user in ignore bypass .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore channel remove <channel>\``, `Remove the channel from ignore channels .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore bypass remove <user mention/id>\``, `Remove the user from ignore bypass .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore channel show\``, `Show ignore module settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore bypass show\``, `Show ignore bypass module settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore channel reset\``, `Resets ignore settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}ignore bypass reset\``, `Resets ignore bypass settings for the server .`)
        .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`)
    };

    await handleIgnoreCommand(client, message, args);

    async function handleIgnoreCommand(client, message, args) {
      const option = args[0];
      const user = message.guild.members.cache.get(args[2]) || message.mentions.members.first() || message.author;
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]) || message.channel;

      switch (option) {
        case 'guide':
          return message.channel.send({ embeds: [embeds.guide] });
          break;
        case 'channel':
          if (args[1] === 'add') {
            await handleAddChannel(client, message, channel);
          } else if (args[1] === 'remove') {
            await handleRemoveChannel(client, message, channel);
          } else if (args[1] === 'show') {
            await handleConfig(client, message);
          } else if (args[1] === 'reset') {
            await handleReset(client, message);
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

    async function handleAddChannel(client, message, channel) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionchannel] });
          }
          if (!channel) {
            return message.channel.send({ embeds: [embeds.mentionchannel] });
          } else {
            if (data.ignorechannellist.includes(channel.id)) {
              return message.channel.send({ embeds: [embeds.alblist] });
            }
            if (data.ignorechannellist.length >= channelLimit) {
              if (channelLimit === 100) {
                return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive channel addition limit of up to 100.`);
              } else {
                return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced channel Addition limit of up to 100. Without premium, the maximum channel addition limit is restricted to 5. Unlock the potential for unlimited channel additions by opting for our Premium subscription.`);
              }
            } else {
              await client.db10.push(`${message.guild.id}_ic.ignorechannellist`, channel.id);
              return message.channel.send({ embeds: [embeds.blist] });
            }
          }
        }
      });
    }

    async function handleRemoveChannel(client, message, channel) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionchannel] });
          }
          if (!channel) {
            return message.channel.send({ embeds: [embeds.mentionchannel] });
          } else {
            if (!data.ignorechannellist.includes(channel.id)) {
              return message.channel.send({ embeds: [embeds.noblist] });
            } else {
              await client.db10.pull(`${message.guild.id}_ic.ignorechannellist`, channel.id);
              return message.channel.send({ embeds: [embeds.remblist] });
            }
          }
        }
      });
    }

    async function handleConfig(client, message) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const channels = data.ignorechannellist;

          if (channels.length === 0) {
            return message.channel.send(`No channel is in ignore bypass Database`);
          }

          const itemsPerPage = 10;
          const totalPages = Math.ceil(channels.length / itemsPerPage);
          let currentPage = 0;

          const generateEmbed = (page) => {
            const startIndex = page * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, channels.length);
            const currentChannels = channels.slice(startIndex, endIndex);
            const mentions = [];

            currentChannels.forEach((channelId, i) => {
              const channel = message.guild.channels.cache.get(channelId);
              if (channel) {
                mentions.push(`\`[${startIndex + i + 1}]\` | ID: [${channelId}](https://discord.com/channels/${message.guild.id}/${channelId}) | <#${channelId}>`);
              }
            });

            const configEmbed = new MessageEmbed()
              .setColor(client.color)
              .setAuthor(client.user.tag, client.user.displayAvatarURL())
              .setTitle(`Total ignore bypasss - Page ${currentPage + 1}/${totalPages}`)
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

    async function handleReset(client, message) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const users = data.ignorechannellist;
          const mentions = [];
          if (users.length !== 0) {
            await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
            return message.channel.send(`Reseted ignore bypass database`);
          } else {
            return message.channel.send(`No channel is in ignore bypass Database`);
          }
        }
      });
    }

    async function handleAddBypass(client, message, user) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          }
          if (!user) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          } else {
            if (data.ignorebypasslist.includes(user.id)) {
              return message.channel.send({ embeds: [embeds.alblist1] });
            }
            if (data.ignorebypasslist.length >= bypassLimit) {
              if (bypassLimit === 100) {
                return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive Ignore Bypass ignore bypass Addition limit of up to 100.`);
              } else {
                return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced Ignore Bypass ignore bypass Addition limit of up to 100. Without premium, the maximum Ignore Bypass ignore bypass Addition limit is restricted to 5. Unlock the potential for unlimited Ignore Bypass ignore bypass Additions by opting for our Premium subscription.`);
              }
            } else {
              await client.db10.push(`${message.guild.id}_ic.ignorebypasslist`, user.id);
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
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          }
          if (!user) {
            return message.channel.send({ embeds: [embeds.mentionsomeone] });
          } else {
            if (!data.ignorebypasslist.includes(user.id)) {
              return message.channel.send({ embeds: [embeds.noblist1] });
            } else {
              await client.db10.pull(`${message.guild.id}_ic.ignorebypasslist`, user.id);
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
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const bypassUsers = data.ignorebypasslist;

          if (bypassUsers.length === 0) {
            return message.channel.send(`No users are in ignore bypass Database`);
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
              .setTitle(`Total Ignore Bypass Users - Page ${currentPage + 1}/${totalPages}`)
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
        .setDescription(`Please run the ignore command again because earlier database was not set up.`);

      await client.db10.get(`${message.guild.id}_ic`).then(async (data) => {
        if (!data) {
          await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const users = data.ignorebypasslist;
          if (users.length !== 0) {
            await client.db10.set(`${message.guild.id}_ic`, { ignorechannellist: [], ignorebypasslist: [] });
            return message.channel.send(`Reseted ignore bypass database`);
          } else {
            return message.channel.send(`No users are in ignore bypass Database`);
          }
        }
      });
    }
  }
};
