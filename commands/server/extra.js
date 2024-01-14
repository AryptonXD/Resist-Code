const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { ownerIDS } = require('../../owner.json');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'extra',
  voteOnly: true,
  run: async (client, message, args) => {
    const prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const arypton = await client.users.fetch(owner);
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[2]) || message.author;
    const ID = user.id
    const premium = await client.db12.get(`${message.guild.id}_premium`);
    const extraOwner = await client.db11.get(`${message.guild.id}_eo.extraownerlist`);
    let ownerLimit;
    let adminLimit;

    if (premium.active === true) {
      ownerLimit = 100;
      adminLimit = 100;
    } else {
      ownerLimit = 5;
      adminLimit = 10;
    }

    const guide = new MessageEmbed()
      .setColor(client.color)
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setThumbnail(client.user.displayAvatarURL())
      .addField(`${emoji.util.arrow} \`${prefix}extra\``, `Shows the guide embed for the module .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra owner add <user mention/id>\``, `Add the extra owner for the server .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra admin add <user mention/id>\``, `Add the extra admin for the server .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra owner remove <user mention/id>\``, `Remove the extra owner for the server .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra admin remove <user mention/id>\``, `Remove the extra admin for the server .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra owner show\``, `Shows the extra owner for this server .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra admin show\``, `Shows the extra admin for this server .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra owner reset\``, `Resets extra owner settings for the server .`)
      .addField(`${emoji.util.arrow} \`${prefix}extra admin reset\``, `Resets extra admin settings for the server .`)
      .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

    const mentionsomeone = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Mention Someone First`);

    const eolist = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.tick} | Added <@${ID}> to Extra Owner for this guild .`);

    const eoallist = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.cross} | Already added <@${ID}> to Extra Owner for this guild .`);

    const remblist = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.tick} | Removed <@${ID}> Extra Owner from this guild .`);

    const noblist = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.cross} | Yet not added <@${ID}> in Extra Owner for this guild .`);

    const eolist1 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.tick} | Added <@${ID}> to extra admin for this guild .`);

    const eoallist1 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.cross} | Already added <@${ID}> to extra admin for this guild .`);

    const remblist1 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.tick} | Removed <@${ID}> extra admin from this guild .`);

    const noblist1 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${emoji.util.cross} | Yet not added <@${ID}> in extra admin for this guild .`);

    const nodata = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription(`Please run the extra owner/admin command again because earlier database was not seted up.`);

    async function handleExtraOwnerAdd(client, message, user) {
      const data = await client.db11.get(`${message.guild.id}_eo`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_eo`, { extraownerlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      if (!user) {
        return message.channel.send({ embeds: [mentionsomeone] });
      }

      if (data.extraownerlist.includes(ID)) {
        return message.channel.send({ embeds: [eoallist] });
      }

      if (data.extraownerlist.length >= ownerLimit) {
        if (ownerLimit === 100) {
          return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive extra owner addition limit of up to 100.`);
        } else {
          return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced extra owner addition limit of up to 100. Without premium, the maximum extra owner addition limit is restricted to 5. Unlock the potential for unlimited extra owner additions by opting for our Premium subscription.`);
        }
      }

      await client.db11.push(`${message.guild.id}_eo.extraownerlist`, ID);
      return message.channel.send({ embeds: [eolist] });
    };

    async function handleExtraOwnerRemove(client, message, user) {
      const data = await client.db11.get(`${message.guild.id}_eo`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_eo`, { extraownerlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      if (!user) {
        return message.channel.send({ embeds: [mentionsomeone] });
      }

      if (!data.extraownerlist.includes(ID)) {
        return message.channel.send({ embeds: [noblist] });
      }

      await client.db11.pull(`${message.guild.id}_eo.extraownerlist`, ID);
      return message.channel.send({ embeds: [remblist] });
    };

    async function handleExtraOwnerConfig(client, message) {
      const data = await client.db11.get(`${message.guild.id}_eo`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_eo`, { extraownerlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      const users = data.extraownerlist;
      const mentions = [];

      if (users.length === 0) {
        return message.channel.send(`No Extra Owner List`);
      }

      const itemsPerPage = 10;
      const totalPages = Math.ceil(users.length / itemsPerPage);
      let currentPage = 0;

      const generateEmbed = (page) => {
        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, users.length);
        const currentUsers = users.slice(startIndex, endIndex);

        currentUsers.forEach((userId, i) => {
          mentions.push(`\`[${startIndex + i + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | <@${userId}>`);
        });

        const configEmbed = new MessageEmbed()
          .setColor(client.color)
          .setAuthor(client.user.tag, client.user.displayAvatarURL())
          .setTitle(`Extra Owner List - Page ${currentPage + 1}/${totalPages}`)
          .setDescription(mentions.join('\n'))
          .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

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
    };

    async function handleExtraOwnerReset(client, message) {
      const data = await client.db11.get(`${message.guild.id}_eo`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_eo`, { extraownerlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      const users = data.extraownerlist;
      if (users.length !== 0) {
        await client.db11.set(`${message.guild.id}_eo`, { extraownerlist: [] });
        return message.channel.send(`Reseted Extra Owner List`);
      } else {
        return message.channel.send(`No one is in Extra Owner List`);
      }
    };

    async function handleExtraAdminAdd(client, message, user) {
      const data = await client.db11.get(`${message.guild.id}_ea`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_ea`, { extraadminlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      if (!user) {
        return message.channel.send({ embeds: [mentionsomeone] });
      }

      if (data.extraadminlist.includes(ID)) {
        return message.channel.send({ embeds: [eoallist1] });
      }

      if (data.extraadminlist.length >= adminLimit) {
        if (adminLimit === 100) {
          return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive extra admin addition limit of up to 100.`);
        } else {
          return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced extra admin addition limit of up to 100. Without premium, the maximum extra admin addition limit is restricted to 10. Unlock the potential for unlimited extra admin additions by opting for our Premium subscription.`);
        }
      }

      await client.db11.push(`${message.guild.id}_ea.extraadminlist`, ID);
      return message.channel.send({ embeds: [eolist1] });
    };

    async function handleExtraAdminRemove(client, message, user) {
      const data = await client.db11.get(`${message.guild.id}_ea`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_ea`, { extraadminlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      if (!user) {
        return message.channel.send({ embeds: [mentionsomeone] });
      }

      if (!data.extraadminlist.includes(ID)) {
        return message.channel.send({ embeds: [noblist1] });
      }

      await client.db11.pull(`${message.guild.id}_ea.extraadminlist`, ID);
      return message.channel.send({ embeds: [remblist1] });
    };

    async function handleExtraAdminConfig(client, message) {
      const data = await client.db11.get(`${message.guild.id}_ea`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_ea`, { extraadminlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      const users = data.extraadminlist;
      const mentions = [];

      if (users.length === 0) {
        return message.channel.send(`No Extra Admin List`);
      }

      const itemsPerPage = 10;
      const totalPages = Math.ceil(users.length / itemsPerPage);
      let currentPage = 0;

      const generateEmbed = (page) => {
        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, users.length);
        const currentUsers = users.slice(startIndex, endIndex);

        currentUsers.forEach((userId, i) => {
          mentions.push(`\`[${startIndex + i + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | <@${userId}>`);
        });

        const configEmbed = new MessageEmbed()
          .setColor(client.color)
          .setAuthor(client.user.tag, client.user.displayAvatarURL())
          .setTitle(`Extra Admin List - Page ${currentPage + 1}/${totalPages}`)
          .setDescription(mentions.join('\n'))
          .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

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
    };

    async function handleExtraAdminReset(client, message) {
      const data = await client.db11.get(`${message.guild.id}_ea`);
      if (!data) {
        await client.db11.set(`${message.guild.id}_ea`, { extraadminlist: [] });
        return message.channel.send({ embeds: [nodata] });
      }

      const users = data.extraadminlist;
      if (users.length !== 0) {
        await client.db11.set(`${message.guild.id}_ea`, { extraadminlist: [] });
        return message.channel.send(`Reseted Extra Admin List`);
      } else {
        return message.channel.send(`No one is in Extra Admin List`);
      }
    };

    switch (args[0]) {
      case undefined:
        if (!message.guild.ownerId.includes(message.author.id) && !ownerIDS.includes(message.author.id) && !extraOwner.includes(message.author.id)) {
          return message.channel.send({ content: `Only Server Owner and Extra Owners Can Use This Command.` });
        }
        return message.channel.send({ embeds: [guide] });
      case 'owner':
        if (!message.guild.ownerId.includes(message.author.id) && !ownerIDS.includes(message.author.id)) {
          return message.channel.send({ content: `Only Server Owner Can Use This Command.` });
        }
        if (args[1] === 'add') {
          return handleExtraOwnerAdd(client, message, user);
        } else if (args[1] === 'remove') {
          return handleExtraOwnerRemove(client, message, user);
        } else if (args[1] === 'show') {
          return handleExtraOwnerConfig(client, message, user);
        } else if (args[1] === 'reset') {
          return handleExtraOwnerReset(client, message);
        }
        break;
      case 'admin':
        if (!message.guild.ownerId.includes(message.author.id) && !ownerIDS.includes(message.author.id) && !extraOwner.includes(message.author.id)) {
          return message.channel.send({ content: `Only Server Owner and Extra Owners Can Use This Command.` });
        }
        if (args[1] === 'add') {
          return handleExtraAdminAdd(client, message, user);
        } else if (args[1] === 'remove') {
          return handleExtraAdminRemove(client, message, user);
        } else if (args[1] === 'show') {
          return handleExtraAdminConfig(client, message, user);
        } else if (args[1] === 'reset') {
          return handleExtraAdminReset(client, message);
        }
        break;
      default:
        return message.channel.send('Invalid command usage.');
    }
  }
};
