const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'media',
  voteOnly: true,
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS'],
  run: async (client, message, args) => {
    const prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const premium = await client.db12.get(`${message.guild.id}_premium`);
    const arypton = await client.users.fetch(owner);
    let limit;

    if (premium.active !== true) {
      limit = 100;
    } else {
      limit = 3;
    }

    const embeds = {
      guide: new MessageEmbed()
        .setColor(client.color)
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`${emoji.util.arrow} \`${prefix}media\``, `Shows the guide embed for the module .`)
        .addField(`${emoji.util.arrow} \`${prefix}media channel add <channel>\``, `Add the channel in media channels .`)
        .addField(`${emoji.util.arrow} \`${prefix}media channel remove <channel>\``, `Remove the channel from media channels .`)
        .addField(`${emoji.util.arrow} \`${prefix}media config\``, `Show media module settings for the server .`)
        .addField(`${emoji.util.arrow} \`${prefix}media reset\``, `Resets media settings for the server .`)
        .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`)
    };

    await handleMediaCommand(client, message, args);

    async function handleMediaCommand(client, message, args) {
      const option = args[0];
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

      switch (option) {
        case 'channel':
          if (args[1] === 'add') {
            await handleAddChannel(client, message, channel);
          } else if (args[1] === 'remove') {
            await handleRemoveChannel(client, message, channel);
          }
          break;
        case 'config':
          await handleConfig(client, message);
          break;
        case 'reset':
          await handleReset(client, message);
          break;
        default:
          return message.channel.send({ embeds: [embeds.guide] });
      }
    }

    async function handleAddChannel(client, message, channel) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the media command again because earlier database was not set up.`);

      await client.db14.get(`${message.guild.id}_mediachannels`).then(async (data) => {
        if (!data) {
          await client.db14.set(`${message.guild.id}_mediachannels`, { mediachannellist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ content: `${emoji.util.cross} | Prioritize Channel Mention` });
          }
          if (!channel) {
            return message.channel.send({ content: `${emoji.util.cross} | Prioritize Channel Mention` });
          } else {
            if (data.mediachannellist.includes(channel.id)) {
              return message.channel.send({ content: `${emoji.util.cross} | Already added \`${channel.name}\` in media channel for this guild.` });
            }
            if (data.mediachannellist.length >= limit) {
              if (limit === 100) {
                return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive media channel addition limit of up to 100.`);
              } else {
                return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced media channel addition limit of up to 100. Without premium, the maximum media channel addition limit is restricted to 5. Unlock the potential for unlimited media channel additions by opting for our Premium subscription.`);
              }
            } else {
              await client.db14.push(`${message.guild.id}_mediachannels.mediachannellist`, channel.id);
              return message.channel.send({ content: `${emoji.util.tick} | Added \`${channel.name}\` in media channel for this guild.` });
            }
          }
        }
      });
    }

    async function handleRemoveChannel(client, message, channel) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the channel command again because earlier database was not set up.`);

      await client.db14.get(`${message.guild.id}_mediachannels`).then(async (data) => {
        if (!data) {
          await client.db14.set(`${message.guild.id}_mediachannels`, { mediachannellist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          if (!args[2]) {
            return message.channel.send({ content: `${emoji.util.cross} | Prioritize Channel Mention` });
          }
          if (!channel) {
            return message.channel.send({ content: `${emoji.util.cross} | Prioritize Channel Mention` });
          } else {
            if (!data.mediachannellist.includes(channel.id)) {
              return message.channel.send({ content: `${emoji.util.cross} | \`${channel.name}\` Yet not added in media channel for this guild.` });
            } else {
              await client.db14.pull(`${message.guild.id}_mediachannels.mediachannellist`, channel.id);
              return message.channel.send({ content: `${emoji.util.tick} | \`${channel.name}\` is Removed from media channel for this guild.` });
            }
          }
        }
      });
    }

    async function handleConfig(client, message) {
      const nodata = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`Please run the media channel command again because earlier database was not set up.`);

      await client.db14.get(`${message.guild.id}_mediachannels`).then(async (data) => {
        if (!data) {
          await client.db14.set(`${message.guild.id}_mediachannels`, { mediachannellist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const channels = data.mediachannellist;

          if (channels.length === 0) {
            return message.channel.send(`No channel is in Media Channel Database`);
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
              } else {
                mentions.push(`\`[${startIndex + i + 1}]\` | Channel with ID ${channelId} has been deleted.`);
              }
            });

            const configEmbed = new MessageEmbed()
              .setColor(client.color)
              .setAuthor(client.user.tag, client.user.displayAvatarURL())
              .setTitle(`Total Media Channels - Page ${currentPage + 1}/${totalPages}`)
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
        .setDescription(`Please run the media channel command again because earlier database was not set up.`);

      await client.db14.get(`${message.guild.id}_mediachannels`).then(async (data) => {
        if (!data) {
          await client.db14.set(`${message.guild.id}_mediachannels`, { mediachannellist: [] });
          return message.channel.send({ embeds: [nodata] });
        } else {
          const users = data.mediachannellist;
          if (users.length !== 0) {
            await client.db14.set(`${message.guild.id}_mediachannels`, { mediachannellist: [] });
            return message.channel.send(`Reseted Media Channel database`);
          } else {
            return message.channel.send(`No channel is in Media Channel Database`);
          }
        }
      });
    }
  }
}
