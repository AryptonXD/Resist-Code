const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'antinuke',
  aliases: ['security'],
  serverOwnerOnly: true,
  voteOnly: true,
  run: async (client, message, args) => {
    let prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const premium = await client.db12.get(`${message.guild.id}_premium`);
    const arypton = await client.users.fetch(owner);
    let limit;

    if (premium.active === true) {
      limit = 100;
    } else {
      limit = 15;
    }

    const antiwizz = [];
    const antiwizzz = [];

    const user = message.guild.members.cache.get(args[2]) || message.mentions.members.first() || message.author;
    const member = message.guild.members.cache.get(args[2]) || message.mentions.members.first() || message.author;
    const ID = user.id;

    const [
      isActivatedAlready, antiban, antikick, antibot, antiunban, antiguildup,
      antimemberup, antichannelcreate, antichanneldelete, antichannelupdate,
      antirolecreate, antiroledelete, antiroleupdate, antiwebhookcreate,
      antiwebhookdelete, antiwebhookupdate, antiemojicreate, antiemojidelete,
      antiemojiupdate, antistickercreate, antistickerdelete, antistickerupdate, antiprune, autorecovery
    ] = await Promise.all([
      client.db.get(`${message.guild.id}_antinuke`),
      client.db.get(`${message.guild.id}_antiban`),
      client.db.get(`${message.guild.id}_antikick`),
      client.db.get(`${message.guild.id}_antibot`),
      client.db.get(`${message.guild.id}_antiunban`),
      client.db.get(`${message.guild.id}_antiguildupdate`),
      client.db.get(`${message.guild.id}_antimemberupdate`),
      client.db.get(`${message.guild.id}_antichannelcreate`),
      client.db.get(`${message.guild.id}_antichanneldelete`),
      client.db.get(`${message.guild.id}_antichannelupdate`),
      client.db.get(`${message.guild.id}_antirolecreate`),
      client.db.get(`${message.guild.id}_antiroledelete`),
      client.db.get(`${message.guild.id}_antiroleupdate`),
      client.db.get(`${message.guild.id}_antiwebhookcreate`),
      client.db.get(`${message.guild.id}_antiwebhookdelete`),
      client.db.get(`${message.guild.id}_antiwebhookupdate`),
      client.db.get(`${message.guild.id}_antiemojicreate`),
      client.db.get(`${message.guild.id}_antiemojidelete`),
      client.db.get(`${message.guild.id}_antiemojiupdate`),
      client.db.get(`${message.guild.id}_antistickercreate`),
      client.db.get(`${message.guild.id}_antistickerdelete`),
      client.db.get(`${message.guild.id}_antistickerupdate`),
      client.db.get(`${message.guild.id}_antiprune`),
      client.db.get(`${message.guild.id}_autorecovery`)
    ]);

    if (antiban) {
      antiwizz.push(`**Anti Ban** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Ban** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antikick) {
      antiwizz.push(`**Anti Kick** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Kick** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antibot) {
      antiwizz.push(`**Anti Bot** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Bot** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiunban) {
      antiwizz.push(`**Anti Unban** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Unban** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiguildup) {
      antiwizz.push(`**Anti Guild Update** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Guild Update** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antimemberup) {
      antiwizz.push(`**Anti Member Update** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Member Update** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antichannelcreate) {
      antiwizz.push(`**Anti Channel Create** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Channel Create** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antichanneldelete) {
      antiwizz.push(`**Anti Channel Delete** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Channel Delete** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antichannelupdate) {
      antiwizz.push(`**Anti Channel Update** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Channel Update** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antirolecreate) {
      antiwizz.push(`**Anti Role Create** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Role Create** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiroledelete) {
      antiwizz.push(`**Anti Role Delete** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Role Delete** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiroleupdate) {
      antiwizz.push(`**Anti Role Update** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Role Update** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiwebhookcreate) {
      antiwizz.push(`**Anti Webhook Create** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Webhook Create** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiwebhookdelete) {
      antiwizz.push(`**Anti Webhook Delete** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Webhook Delete** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiwebhookupdate) {
      antiwizz.push(`**Anti Webhook Update** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Webhook Update** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiemojicreate) {
      antiwizz.push(`**Anti Emoji Create** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Emoji Create** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiemojidelete) {
      antiwizz.push(`**Anti Emoji Delete** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Emoji Delete** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiemojiupdate) {
      antiwizz.push(`**Anti Emoji Update** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Emoji Update** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antistickercreate) {
      antiwizz.push(`**Anti Sticker Create** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Sticker Create** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antistickerdelete) {
      antiwizz.push(`**Anti Sticker Delete** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Sticker Delete** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antistickerupdate) {
      antiwizz.push(`**Anti Sticker Update** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizz.push(`**Anti Sticker Update** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (antiprune) {
      antiwizzz.push(`**Anti Prune** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizzz.push(`**Anti Prune** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    if (autorecovery) {
      antiwizzz.push(`**Auto Recovery** ${emoji.util.disabler}${emoji.util.enabled}`)
    } else {
      antiwizzz.push(`**Auto Recovery** ${emoji.util.disabled}${emoji.util.enabler}`)
    }

    const mentionsomeone = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription("Please Mention Someone First");

    const eeeee = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Antinuke is currently active on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To deactivate this feature, please use the command ${prefix}antinuke disable`);

    const eeee = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Antinuke settings have been successfully enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To deactivate this feature, please use the command ${prefix}antinuke disable`);

    const ddddd = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Antinuke has been deactivated on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To activate this feature, please use the command ${prefix}antinuke enable`);

    const dddd = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Antinuke settings have been successfully deactivated on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To activate this feature, please use the command ${prefix}antinuke enable`);

    const raja = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`This command can only be executed by the server owner.`)
      .setFooter("Add me to your server to unlock my powers ;)")

    const features = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`**Welcome to ${client.user.username}'s Antinuke Page**
If you need assistance, please join our [Support Server](${Settings.bot.credits.supportServer}).

**Astonishing Antinuke Features**
- ${emoji.util.arrow} Anti Ban
- ${emoji.util.arrow} Anti Kick
- ${emoji.util.arrow} Anti Bot
- ${emoji.util.arrow} Anti Unban
- ${emoji.util.arrow} Anti Guild Update
- ${emoji.util.arrow} Anti Member Update
- ${emoji.util.arrow} Anti Role Create
- ${emoji.util.arrow} Anti Role Delete
- ${emoji.util.arrow} Anti Role Update
- ${emoji.util.arrow} Anti Channel Create
- ${emoji.util.arrow} Anti Channel Delete
- ${emoji.util.arrow} Anti Channel Update
- ${emoji.util.arrow} Anti Webhook Create
- ${emoji.util.arrow} Anti Webhook Delete
- ${emoji.util.arrow} Anti Webhook Update
- ${emoji.util.arrow} Anti Emoji Create
- ${emoji.util.arrow} Anti Emoji Delete
- ${emoji.util.arrow} Anti Emoji Update
- ${emoji.util.arrow} Anti Sticker Create
- ${emoji.util.arrow} Anti Sticker Delete
- ${emoji.util.arrow} Anti Sticker Update
- ${emoji.util.arrow} Anti Prune [[Premium](${Settings.bot.credits.supportServer})]
- ${emoji.util.arrow} Auto Recovery [[Premium](${Settings.bot.credits.supportServer})]`
      )
      .addField(`Links`, `• Join the [magnificent support server](${Settings.bot.credits.supportServer}) if you require assistance.`, false)
      .setFooter(`Developed by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

    const antibanalreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Ban is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable Anti Ban, please use the command ${prefix}antinuke antiban disable`);

    const antibanon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Ban has been successfully enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable Anti Ban, please use the command ${prefix}antinuke antiban disable`);

    const antibanalreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Ban is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable Anti Ban, please use the command ${prefix}antinuke antiban enable`);

    const antibanoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Ban has been successfully disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable Anti Ban, please use the command ${prefix}antinuke antiban enable`);

    const antikickalreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Kick is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable Anti Kick, please use the command ${prefix}antinuke antikick disable`);

    const antikickon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Kick has been successfully enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable Anti Kick, please use the command ${prefix}antinuke antikick disable`);

    const antikickalreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Kick is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable Anti Kick, please use the command ${prefix}antinuke antikick enable`);

    const antikickoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Kick has been successfully disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable Anti Kick, please use the command ${prefix}antinuke antikick enable`);

    const antibotalreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Bot is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antibot disable`);

    const antiboton = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Bot has been successfully enabled.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antibot disable`);

    const antibotalreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Bot is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antibot enable`);

    const antibotoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Bot has been successfully disabled.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antibot enable`);

    const antiunbanalreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Unban is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiunban disable`);

    const antiunbanon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Unban has been successfully enabled.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiunban disable`);

    const antiunbanalreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Unban is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiunban enable`);

    const antiunbanoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Unban has been successfully disabled.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiunban enable`);

    const antiguildupalreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Guild Update is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiguild update disable`);

    const antiguildupon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Guild Update has been successfully enabled.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiguild update disable`);

    const antiguildupalreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Guild Update is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiguild update enable`);

    const antiguildupoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Guild Update has been successfully disabled.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiguild update enable`);

    const antimemberupalreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Member Update is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antimember update disable`);

    const antimemberupon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Member Update has been successfully enabled.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antimember update disable`);

    const antimemberupalreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Member Update is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antimember update enable`);

    const antimemberupoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Member Update has been successfully disabled.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antimember update enable`);

    const antichannelcreatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Channel Create is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antichannel create disable`);

    const antichannelcreateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Channel Create has been successfully enabled.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antichannel create disable`);

    const antichannelcreatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Channel Create is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antichannel create enable`);

    const antichannelcreateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Channel Create has been successfully disabled.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antichannel create enable`);

    const antichanneldeletealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Channel Delete is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antichannel delete disable`);

    const antichanneldeleteon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Channel Delete has been successfully enabled.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antichannel delete disable`);

    const antichanneldeletealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Channel Delete is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antichannel delete enable`);

    const antichanneldeleteoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Channel Delete has been successfully disabled.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antichannel delete enable`);

    const antichannelupdatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Channel Update is already enabled on your server.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antichannel update disable`);

    const antichannelupdateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Channel Update has been successfully enabled.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antichannel update disable`);

    const antichannelupdatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Oops! It seems that Anti Channel Update is already disabled on your server.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antichannel update enable`);

    const antichannelupdateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Anti Channel Update has been successfully disabled.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antichannel update enable`);

    const antirolecreatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Role Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antirole create disable`);

    const antirolecreateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Role Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antirole create disable`);

    const antirolecreatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Role Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antirole create enable`);

    const antirolecreateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Role Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antirole create enable`);

    const antiroledeletealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Role Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antirole delete disable`);

    const antiroledeleteon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Role Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antirole delete disable`);

    const antiroledeletealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Role Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antirole delete enable`);

    const antiroledeleteoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Role Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antirole delete enable`);

    const antiroleupdatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Role Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antirole update disable`);

    const antiroleupdateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Role Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antirole update disable`);

    const antiroleupdatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Role Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antirole update enable`);

    const antiroleupdateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Role Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antirole update enable`);

    const antiwebhookcreatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Webhook Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiwebhook create disable`);

    const antiwebhookcreateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Webhook Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiwebhook create disable`);

    const antiwebhookcreatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Webhook Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiwebhook create enable`);

    const antiwebhookcreateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Webhook Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiwebhook create enable`);

    const antiwebhookdeletealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Webhook Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiwebhook delete disable`);

    const antiwebhookdeleteon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Webhook Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiwebhook delete disable`);

    const antiwebhookdeletealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Webhook Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiwebhook delete enable`);

    const antiwebhookdeleteoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Webhook Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiwebhook delete enable`);

    const antiwebhookupdatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Webhook Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiwebhook update disable`);

    const antiwebhookupdateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Webhook Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiwebhook update disable`);

    const antiwebhookupdatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Webhook Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiwebhook update enable`);

    const antiwebhookupdateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Webhook Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiwebhook update enable`);

    const antiemojicreatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Emoji Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiemoji create disable`);

    const antiemojicreateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Emoji Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiemoji create disable`);

    const antiemojicreatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Emoji Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiemoji create enable`);

    const antiemojicreateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Emoji Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiemoji create enable`);

    const antiemojideletealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Emoji Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiemoji delete disable`);

    const antiemojideleteon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Emoji Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiemoji delete disable`);

    const antiemojideletealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Emoji Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiemoji delete enable`);

    const antiemojideleteoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Emoji Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiemoji delete enable`);

    const antiemojiupdatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Emoji Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiemoji update disable`);

    const antiemojiupdateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Emoji Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiemoji update disable`);

    const antiemojiupdatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Emoji Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiemoji update enable`);

    const antiemojiupdateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Emoji Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiemoji update enable`);

    const antistickercreatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Sticker Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antisticker create disable`);

    const antistickercreateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Sticker Create.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antisticker create disable`);

    const antistickercreatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Sticker Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antisticker create enable`);

    const antistickercreateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Sticker Create.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antisticker create enable`);

    const antistickerdeletealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Sticker Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antisticker delete disable`);

    const antistickerdeleteon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Sticker Delete.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antisticker delete disable`);

    const antistickerdeletealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Sticker Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antisticker delete enable`);

    const antistickerdeleteoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Sticker Delete.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antisticker delete enable`);

    const antistickerupdatealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Sticker Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antisticker update disable`);

    const antistickerupdateon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Sticker Update.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antisticker update disable`);

    const antistickerupdatealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Sticker Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antisticker update enable`);

    const antistickerupdateoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Sticker Update.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antisticker update enable`);

    const antiprunealreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Anti Prune.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiprune disable`);

    const antipruneon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully enabled Anti Prune.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke antiprune disable`);

    const antiprunealreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Anti Prune.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiprune enable`);

    const antipruneoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Anti Prune.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke antiprune enable`);

    const autorecoveryalreadyon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already enabled Auto Recovery.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke autorecovery disable`);

    const autorecoveryon = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully Enabled Auto Recovery.
Current Status: ${emoji.util.disabler}${emoji.util.enabled}`
      })
      .setFooter(`To disable it, use ${prefix}antinuke autorecovery disable`);

    const autorecoveryalreadyoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Ohh uh! Looks like your server has already disabled Auto Recovery.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke autorecovery enable`);

    const autorecoveryoff = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`,
        value: `Successfully disabled Auto Recovery.
Current Status: ${emoji.util.disabled}${emoji.util.enabler}`
      })
      .setFooter(`To enable it, use ${prefix}antinuke autorecovery enable`);

    const onkrle = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Enable Antinuke First to use this Command.`);

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Vote Me")
        .setStyle("LINK")
        .setURL(`https://top.gg/bot/${client.user.id}?s=0ae05abf3185d`)
    );

    const button2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
    );

    const pag = new MessageActionRow().addComponents(
      new MessageButton().setStyle(`PRIMARY`).setCustomId(`lol1`).setLabel(`≪`).setDisabled(true),
      new MessageButton().setStyle(`SUCCESS`).setCustomId(`lol2`).setLabel(`Previous`).setDisabled(true),
      new MessageButton().setStyle(`DANGER`).setCustomId(`lol3`).setLabel(`Close`),
      new MessageButton().setStyle(`SUCCESS`).setCustomId(`lol4`).setLabel(`Next`),
      new MessageButton().setStyle(`PRIMARY`).setCustomId(`lol5`).setLabel(`≫`)
    );

    const antiguidepg1 = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (33)`, client.user.displayAvatarURL())
      .addField(`${emoji.util.arrow} \`${prefix}antinuke\``, "Helps To Toggle Antinuke")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke guide\``, "Gives you Antinuke Help Menu Just Like This.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke enable\``, "Enables the security system for the server.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke disable\``, "Disables the security system for the server.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke config\``, "Shows you details about the security settings.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiban enable/disable\``, "Toggles Anti Ban.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antikick enable/disable\``, "Toggles Anti Kick.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antibot enable/disable\``, "Toggles Anti Bot.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiunban enable/disable\``, "Toggles Anti Unban.")
      .setFooter(`${client.user.username} • Page 1/4`, client.user.displayAvatarURL());

    const antiguidepg2 = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (33)`, client.user.displayAvatarURL())
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiguild update enable/disable\``, "Toggles Anti Guild Update.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antimember update enable/disable\``, "Toggles Anti Member Update.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antirole create enable/disable\``, "Toggles Anti Role Create.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antirole delete enable/disable\``, "Toggles Anti Role Delete.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antirole update enable/disable\``, "Toggles Anti Role Update.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antichannel create enable/disable\``, "Toggles Anti Channel Create.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antichannel delete enable/disable\``, "Toggles Anti Channel Delete.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antichannel update enable/disable\``, "Toggles Anti Channel Update.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiwebhook create enable/disable\``, "Toggles Anti Webhook Create.")
      .setFooter(`${client.user.username} • Page 2/4`, client.user.displayAvatarURL());

    const antiguidepg3 = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (33)`, client.user.displayAvatarURL())
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiwebhook delete enable/disable\``, "Toggles Anti Webhook Delete.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiwebhook update enable/disable\``, "Toggles Anti Webhook Update.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiemoji create enable/disable\``, "Toggles Anti Emoji Create.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiemoji delete enable/disable\``, "Toggles Anti Emoji Delete.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiemoji update enable/disable\``, "Toggles Anti Emoji Update.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antisticker create enable/disable\``, "Toggles Anti Sticker Create.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antisticker delete enable/disable\``, "Toggles Anti Sticker Delete.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antisticker update enable/disable\``, "Toggles Anti Sticker Update.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke antiprune enable/disable\``, "Toggles Anti Prune.")
      .setFooter(`${client.user.username} • Page 3/4`, client.user.displayAvatarURL());

    const antiguidepg4 = new MessageEmbed()
      .setColor(client.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (33)`, client.user.displayAvatarURL())
      .addField(`${emoji.util.arrow} \`${prefix}antinuke autorecovery enable/disable\``, "Toggles Auto Recovery.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke reset\``, "Helps to reset all Antinuke Settings.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke whitelist user <user>\``, "Add/Removes a user from whitelisted users in the server.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke whitelist reset\``, "Removes all the users/roles from whitelisted users/roles in the server.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke whitelist show\``, "Shows a list of whitelisted users/roles in the server.")
      .addField(`${emoji.util.arrow} \`${prefix}antinuke features\``, "Shows all Antinuke features.")
      .setFooter(`${client.user.username} • Page 4/4`, client.user.displayAvatarURL());

    const nodata = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setDescription('Please run the whitelist command again because the database was not set up earlier.');

    if (args[0] === 'whitelist' && args[1] === 'add') {

      if (!isActivatedAlready) {
        return message.channel.send({ embeds: [onkrle] });
      } else {
        await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            return message.channel.send({ embeds: [nodata] });
          } else {
            if (!user || !args[2]) {
              return message.channel.send({ content: `${emoji.util.cross} | Kindly initiate the conversation by addressing a specific individual in the first instance.` });
            } else {
              if (data.whitelisted.includes(ID)) {
                return message.channel.send({ content: `${emoji.util.cross} | \`${member.user.username}\` is already in the Whitelisted users.` });
              }
              if (data.whitelisted.length >= limit) {
                if (limit === 100) {
                  return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can only enjoy an impressive whitelist addition limit of up to 100.`);
                } else {
                  return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced whitelist addition limit of up to 100. Without premium, the maximum whitelist addition limit is restricted to 15. Unlock the potential for unlimited whitelist additions by opting for our Premium subscription.`);
                }
              } else {
                await client.db.push(`${message.guild.id}_wl.whitelisted`, ID);
                return message.channel.send({ content: `${emoji.util.tick} | Successfully added \`${member.user.username}\` to the Whitelisted users.` });
              }
            }
          }
        });
      }
    } else if (args[0] === 'whitelist' && args[1] === 'remove') {

      if (!isActivatedAlready) {
        return message.channel.send({ embeds: [onkrle] });
      } else {
        await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            return message.channel.send({ embeds: [nodata] });
          } else {
            if (!user || !args[2]) {
              return message.channel.send({ content: `${emoji.util.cross} | Kindly initiate the conversation by addressing a specific individual in the first instance.` });
            } else {
              if (!data.whitelisted.includes(ID)) {
                return message.channel.send({ content: `${emoji.util.cross} | \`${member.user.username}\` has not been added to the Whitelisted users yet.` });
              } else {
                await client.db.pull(`${message.guild.id}_wl.whitelisted`, ID);
                return message.channel.send({ content: `${emoji.util.tick} | Successfully removed \`${member.user.username}\` from the Whitelisted users.` });
              }
            }
          }
        });
      }
    } else if (args[0] === 'wl' && args[1] === 'add') {

      if (!isActivatedAlready) {
        return message.channel.send({ embeds: [onkrle] });
      } else {
        await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            return message.channel.send({ embeds: [nodata] });
          } else {
            if (!user || !args[2]) {
              return message.channel.send({ content: `${emoji.util.cross} | Kindly initiate the conversation by addressing a specific individual in the first instance.` });
            } else {
              if (data.whitelisted.includes(ID)) {
                return message.channel.send({ embeds: [alwlist] });
              }
              if (data.whitelisted.length >= limit) {
                if (limit === 100) {
                  return message.channel.send(`${emoji.util.cross} | With our premium subscription, you can enjoy an impressive whitelist addition limit of up to 100.`);
                } else {
                  return message.channel.send(`${emoji.util.cross} | Upgrade to our premium plan to access an enhanced whitelist addition limit of up to 100. Without premium, the maximum whitelist addition limit is restricted to 15. Unlock the potential for unlimited whitelist additions by opting for our Premium subscription.`);
                }
              } else {
                await client.db.push(`${message.guild.id}_wl.whitelisted`, ID);
                return message.channel.send({ content: `${emoji.util.tick} | Successfully added \`${member.user.username}\` to the Whitelisted users.` });
              }
            }
          }
        });
      }
    } else if (args[0] === 'wl' && args[1] === 'remove') {

      if (!isActivatedAlready) {
        return message.channel.send({ embeds: [onkrle] });
      } else {
        await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            return message.channel.send({ embeds: [nodata] });
          } else {
            if (!user || !args[2]) {
              return message.channel.send({ content: `${emoji.util.cross} | Kindly initiate the conversation by addressing a specific individual in the first instance.` });
            } else {
              if (!data.whitelisted.includes(ID)) {
                return message.channel.send({ embeds: [nowlist] });
              } else {
                await client.db.pull(`${message.guild.id}_wl.whitelisted`, ID);
                return message.channel.send({ content: `${emoji.util.tick} | Successfully removed \`${member.user.username}\` from the Whitelisted users.` });
              }
            }
          }
        });
      }
    }

    const command = args.join(" ");

    switch (command) {
      case 'config':
      case 'show':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        } else {
          await client.db.get(`${message.guild.id}_wl`).then(async (wllisted) => {

            const settingss = new MessageEmbed()
              .setColor(client.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setAuthor(client.user.tag, client.user.displayAvatarURL())
              .setDescription(`**Antinuke Events Settings**\n\n${antiwizz.join("\n")}\n\n**Whitelisted Users**: ${wllisted.whitelisted.length || 0}\n\n${antiwizzz.join("\n")}`)
              .addFields({
                name: `Other Settings`,
                value: `To toggle any event, type ${prefix}antinuke guide.
        Available Punishment: Ban (This is a fixed option; ensure to whitelist trusted individuals.)`
              })
              .setFooter(`Developed by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);
            return message.channel.send({ embeds: [settingss], components: [button] });
          });
        }
        break;

      case 'features':
        return message.channel.send({ embeds: [features], components: [button] });

      case 'enable':
      case 'on':
        if (isActivatedAlready) {
          return message.channel.send({ embeds: [eeeee], components: [button] });
        } else if (premium.active !== true) {
          await Promise.all([
            client.db.set(`${message.guild.id}_antinuke`, true),
            client.db.set(`${message.guild.id}_antiban`, true),
            client.db.set(`${message.guild.id}_antikick`, true),
            client.db.set(`${message.guild.id}_antibot`, true),
            client.db.set(`${message.guild.id}_antiunban`, true),
            client.db.set(`${message.guild.id}_antiguildupdate`, true),
            client.db.set(`${message.guild.id}_antimemberupdate`, true),
            client.db.set(`${message.guild.id}_antichannelcreate`, true),
            client.db.set(`${message.guild.id}_antichanneldelete`, true),
            client.db.set(`${message.guild.id}_antichannelupdate`, true),
            client.db.set(`${message.guild.id}_antirolecreate`, true),
            client.db.set(`${message.guild.id}_antiroledelete`, true),
            client.db.set(`${message.guild.id}_antiroleupdate`, true),
            client.db.set(`${message.guild.id}_antiwebhookcreate`, true),
            client.db.set(`${message.guild.id}_antiwebhookdelete`, true),
            client.db.set(`${message.guild.id}_antiwebhookupdate`, true),
            client.db.set(`${message.guild.id}_antiemojicreate`, true),
            client.db.set(`${message.guild.id}_antiemojidelete`, true),
            client.db.set(`${message.guild.id}_antiemojiupdate`, true),
            client.db.set(`${message.guild.id}_antistickercreate`, true),
            client.db.set(`${message.guild.id}_antistickerdelete`, true),
            client.db.set(`${message.guild.id}_antistickerupdate`, true),
            client.db.set(`${message.guild.id}_antiprune`, false),
            client.db.set(`${message.guild.id}_autorecovery`, false),
            client.db.set(`${message.guild.id}_wl`, { whitelisted: [] })
          ]);
          return message.channel.send({ embeds: [eeee], components: [button] });
        } else {
          await Promise.all([
            client.db.set(`${message.guild.id}_antinuke`, true),
            client.db.set(`${message.guild.id}_antiban`, true),
            client.db.set(`${message.guild.id}_antikick`, true),
            client.db.set(`${message.guild.id}_antibot`, true),
            client.db.set(`${message.guild.id}_antiunban`, true),
            client.db.set(`${message.guild.id}_antiguildupdate`, true),
            client.db.set(`${message.guild.id}_antimemberupdate`, true),
            client.db.set(`${message.guild.id}_antichannelcreate`, true),
            client.db.set(`${message.guild.id}_antichanneldelete`, true),
            client.db.set(`${message.guild.id}_antichannelupdate`, true),
            client.db.set(`${message.guild.id}_antirolecreate`, true),
            client.db.set(`${message.guild.id}_antiroledelete`, true),
            client.db.set(`${message.guild.id}_antiroleupdate`, true),
            client.db.set(`${message.guild.id}_antiwebhookcreate`, true),
            client.db.set(`${message.guild.id}_antiwebhookdelete`, true),
            client.db.set(`${message.guild.id}_antiwebhookupdate`, true),
            client.db.set(`${message.guild.id}_antiemojicreate`, true),
            client.db.set(`${message.guild.id}_antiemojidelete`, true),
            client.db.set(`${message.guild.id}_antiemojiupdate`, true),
            client.db.set(`${message.guild.id}_antistickercreate`, true),
            client.db.set(`${message.guild.id}_antistickerdelete`, true),
            client.db.set(`${message.guild.id}_antistickerupdate`, true),
            client.db.set(`${message.guild.id}_antiprune`, true),
            client.db.set(`${message.guild.id}_autorecovery`, true),
            client.db.set(`${message.guild.id}_wl`, { whitelisted: [] })
          ]);
          return message.channel.send({ embeds: [eeee], components: [button] });
        }

      case 'disable':
      case 'off':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [ddddd], components: [button] });
        } else {
          await Promise.all([
            client.db.delete(`${message.guild.id}_antinuke`),
            client.db.delete(`${message.guild.id}_antiban`),
            client.db.delete(`${message.guild.id}_antikick`),
            client.db.delete(`${message.guild.id}_antibot`),
            client.db.delete(`${message.guild.id}_antiunban`),
            client.db.delete(`${message.guild.id}_antiguildupdate`),
            client.db.delete(`${message.guild.id}_antimemberupdate`),
            client.db.delete(`${message.guild.id}_antichannelcreate`),
            client.db.delete(`${message.guild.id}_antichanneldelete`),
            client.db.delete(`${message.guild.id}_antichannelupdate`),
            client.db.delete(`${message.guild.id}_antirolecreate`),
            client.db.delete(`${message.guild.id}_antiroledelete`),
            client.db.delete(`${message.guild.id}_antiroleupdate`),
            client.db.delete(`${message.guild.id}_antiwebhookcreate`),
            client.db.delete(`${message.guild.id}_antiwebhookdelete`),
            client.db.delete(`${message.guild.id}_antiwebhookupdate`),
            client.db.delete(`${message.guild.id}_antiemojicreate`),
            client.db.delete(`${message.guild.id}_antiemojidelete`),
            client.db.delete(`${message.guild.id}_antiemojiupdate`),
            client.db.delete(`${message.guild.id}_antistickercreate`),
            client.db.delete(`${message.guild.id}_antistickerdelete`),
            client.db.delete(`${message.guild.id}_antistickerupdate`),
            client.db.delete(`${message.guild.id}_antiprune`),
            client.db.delete(`${message.guild.id}_autorecovery`),
            client.db.delete(`${message.guild.id}_wl`)
          ]);
          return message.channel.send({ embeds: [dddd], components: [button] });
        }

      case 'reset':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [ddddd], components: [button] });
        } else {
          await Promise.all([
            client.db.delete(`${message.guild.id}_antinuke`),
            client.db.delete(`${message.guild.id}_antiban`),
            client.db.delete(`${message.guild.id}_antikick`),
            client.db.delete(`${message.guild.id}_antibot`),
            client.db.delete(`${message.guild.id}_antiunban`),
            client.db.delete(`${message.guild.id}_antiguildupdate`),
            client.db.delete(`${message.guild.id}_antimemberupdate`),
            client.db.delete(`${message.guild.id}_antichannelcreate`),
            client.db.delete(`${message.guild.id}_antichanneldelete`),
            client.db.delete(`${message.guild.id}_antichannelupdate`),
            client.db.delete(`${message.guild.id}_antirolecreate`),
            client.db.delete(`${message.guild.id}_antiroledelete`),
            client.db.delete(`${message.guild.id}_antiroleupdate`),
            client.db.delete(`${message.guild.id}_antiwebhookcreate`),
            client.db.delete(`${message.guild.id}_antiwebhookdelete`),
            client.db.delete(`${message.guild.id}_antiwebhookupdate`),
            client.db.delete(`${message.guild.id}_antiemojicreate`),
            client.db.delete(`${message.guild.id}_antiemojidelete`),
            client.db.delete(`${message.guild.id}_antiemojiupdate`),
            client.db.delete(`${message.guild.id}_antistickercreate`),
            client.db.delete(`${message.guild.id}_antistickerdelete`),
            client.db.delete(`${message.guild.id}_antistickerupdate`),
            client.db.delete(`${message.guild.id}_antiprune`),
            client.db.delete(`${message.guild.id}_autorecovery`),
            client.db.delete(`${message.guild.id}_wl`)
          ]);
          return message.channel.send({ embeds: [dddd], components: [button] });
        }

      case 'antiban enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiban) {
          return message.channel.send({ embeds: [antibanalreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiban`, true);
          return message.channel.send({ embeds: [antibanon], components: [button] });
        }

      case 'antiban disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiban) {
          return message.channel.send({ embeds: [antibanalreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiban`, true);
          return message.channel.send({ embeds: [antibanoff], components: [button] });
        }

      case 'antikick enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antikick) {
          return message.channel.send({ embeds: [antikickalreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antikick`, true);
          return message.channel.send({ embeds: [antikickon], components: [button] });
        }

      case 'antikick disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antikick) {
          return message.channel.send({ embeds: [antikickalreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antikick`, true);
          return message.channel.send({ embeds: [antikickoff], components: [button] });
        }

      case 'antibot enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antibot) {
          return message.channel.send({ embeds: [antibotalreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antibot`, true);
          return message.channel.send({ embeds: [antiboton], components: [button] });
        }

      case 'antibot disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antibot) {
          return message.channel.send({ embeds: [antibotalreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antibot`, true);
          return message.channel.send({ embeds: [antibotoff], components: [button] });
        }

      case 'antiunban enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiunban) {
          return message.channel.send({ embeds: [antiunbanalreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiunban`, true);
          return message.channel.send({ embeds: [antiunbanon], components: [button] });
        }

      case 'antiunban disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiunban) {
          return message.channel.send({ embeds: [antiunbanalreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiunban`, true);
          return message.channel.send({ embeds: [antiunbanoff], components: [button] });
        }

      case 'antiguild update enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiguildup) {
          return message.channel.send({ embeds: [antiguildupalreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiguildupdate`, true);
          return message.channel.send({ embeds: [antiguildupon], components: [button] });
        }

      case 'antiguild update disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiguildup) {
          return message.channel.send({ embeds: [antiguildupalreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiguildupdate`, true);
          return message.channel.send({ embeds: [antiguildupoff], components: [button] });
        }

      case 'antimember update enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antimemberup) {
          return message.channel.send({ embeds: [antimemberupalreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antimemberupdate`, true);
          return message.channel.send({ embeds: [antimemberupon], components: [button] });
        }

      case 'antimember update disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antimemberup) {
          return message.channel.send({ embeds: [antimemberupalreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antimemberupdate`, true);
          return message.channel.send({ embeds: [antimemberupoff], components: [button] });
        }

      case 'antichannel create enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antichannelcreate) {
          return message.channel.send({ embeds: [antichannelcreatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antichannelcreate`, true);
          return message.channel.send({ embeds: [antichannelcreateon], components: [button] });
        }

      case 'antichannel create disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antichannelcreate) {
          return message.channel.send({ embeds: [antichannelcreatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antichannelcreate`, true);
          return message.channel.send({ embeds: [antichannelcreateoff], components: [button] });
        }

      case 'antichannel delete enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antichanneldelete) {
          return message.channel.send({ embeds: [antichanneldeletealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antichanneldelete`, true);
          return message.channel.send({ embeds: [antichanneldeleteon], components: [button] });
        }

      case 'antichannel delete disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antichanneldelete) {
          return message.channel.send({ embeds: [antichanneldeletealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antichanneldelete`, true);
          return message.channel.send({ embeds: [antichanneldeleteoff], components: [button] });
        }

      case 'antichannel update enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antichannelupdate) {
          return message.channel.send({ embeds: [antichannelupdatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antichannelupdate`, true);
          return message.channel.send({ embeds: [antichannelupdateon], components: [button] });
        }

      case 'antichannel update disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antichannelupdate) {
          return message.channel.send({ embeds: [antichannelupdatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antichannelupdate`, true);
          return message.channel.send({ embeds: [antichannelupdateoff], components: [button] });
        }

      case 'antirole create enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antirolecreate) {
          return message.channel.send({ embeds: [antirolecreatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antirolecreate`, true);
          return message.channel.send({ embeds: [antirolecreateon], components: [button] });
        }

      case 'antirole create disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antirolecreate) {
          return message.channel.send({ embeds: [antirolecreatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antirolecreate`, true);
          return message.channel.send({ embeds: [antirolecreateoff], components: [button] });
        }

      case 'antirole delete enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiroledelete) {
          return message.channel.send({ embeds: [antiroledeletealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiroledelete`, true);
          return message.channel.send({ embeds: [antiroledeleteon], components: [button] });
        }

      case 'antirole delete disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiroledelete) {
          return message.channel.send({ embeds: [antiroledeletealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiroledelete`, true);
          return message.channel.send({ embeds: [antiroledeleteoff], components: [button] });
        }

      case 'antirole update enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiroleupdate) {
          return message.channel.send({ embeds: [antiroleupdatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiroleupdate`, true);
          return message.channel.send({ embeds: [antiroleupdateon], components: [button] });
        }

      case 'antirole update disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiroleupdate) {
          return message.channel.send({ embeds: [antiroleupdatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiroleupdate`, true);
          return message.channel.send({ embeds: [antiroleupdateoff], components: [button] });
        }

      case 'antiwebhook create enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiwebhookcreate) {
          return message.channel.send({ embeds: [antiwebhookcreatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiwebhookcreate`, true);
          return message.channel.send({ embeds: [antiwebhookcreateon], components: [button] });
        }

      case 'antiwebhook create disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiwebhookcreate) {
          return message.channel.send({ embeds: [antiwebhookcreatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiwebhookcreate`, true);
          return message.channel.send({ embeds: [antiwebhookcreateoff], components: [button] });
        }

      case 'antiwebhook delete enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiwebhookdelete) {
          return message.channel.send({ embeds: [antiwebhookdeletealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiwebhookdelete`, true);
          return message.channel.send({ embeds: [antiwebhookdeleteon], components: [button] });
        }

      case 'antiwebhook delete disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiwebhookdelete) {
          return message.channel.send({ embeds: [antiwebhookdeletealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiwebhookdelete`, true);
          return message.channel.send({ embeds: [antiwebhookdeleteoff], components: [button] });
        }

      case 'antiwebhook update enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiwebhookupdate) {
          return message.channel.send({ embeds: [antiwebhookupdatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiwebhookupdate`, true);
          return message.channel.send({ embeds: [antiwebhookupdateon], components: [button] });
        }

      case 'antiwebhook update disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiwebhookupdate) {
          return message.channel.send({ embeds: [antiwebhookupdatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiwebhookupdate`, true);
          return message.channel.send({ embeds: [antiwebhookupdateoff], components: [button] });
        }

      case 'antiemoji create enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiemojicreate) {
          return message.channel.send({ embeds: [antiemojicreatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiemojicreate`, true);
          return message.channel.send({ embeds: [antiemojicreateon], components: [button] });
        }

      case 'antiemoji create disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiemojicreate) {
          return message.channel.send({ embeds: [antiemojicreatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiemojicreate`, true);
          return message.channel.send({ embeds: [antiemojicreateoff], components: [button] });
        }

      case 'antiemoji delete enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiemojidelete) {
          return message.channel.send({ embeds: [antiemojideletealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiemojidelete`, true);
          return message.channel.send({ embeds: [antiemojideleteon], components: [button] });
        }

      case 'antiemoji delete disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiemojidelete) {
          return message.channel.send({ embeds: [antiemojideletealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiemojidelete`, true);
          return message.channel.send({ embeds: [antiemojideleteoff], components: [button] });
        }

      case 'antiemoji update enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiemojiupdate) {
          return message.channel.send({ embeds: [antiemojiupdatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiemojiupdate`, true);
          return message.channel.send({ embeds: [antiemojiupdateon], components: [button] });
        }

      case 'antiemoji update disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiemojiupdate) {
          return message.channel.send({ embeds: [antiemojiupdatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiemojiupdate`, true);
          return message.channel.send({ embeds: [antiemojiupdateoff], components: [button] });
        }

      case 'antisticker create enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antistickercreate) {
          return message.channel.send({ embeds: [antistickercreatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antistickercreate`, true);
          return message.channel.send({ embeds: [antistickercreateon], components: [button] });
        }

      case 'antisticker create disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antistickercreate) {
          return message.channel.send({ embeds: [antistickercreatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antistickercreate`, true);
          return message.channel.send({ embeds: [antistickercreateoff], components: [button] });
        }

      case 'antisticker delete enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antistickerdelete) {
          return message.channel.send({ embeds: [antistickerdeletealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antistickerdelete`, true);
          return message.channel.send({ embeds: [antistickerdeleteon], components: [button] });
        }

      case 'antisticker delete disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antistickerdelete) {
          return message.channel.send({ embeds: [antistickerdeletealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antistickerdelete`, true);
          return message.channel.send({ embeds: [antistickerdeleteoff], components: [button] });
        }

      case 'antisticker update enable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antistickerupdate) {
          return message.channel.send({ embeds: [antistickerupdatealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antistickerupdate`, true);
          return message.channel.send({ embeds: [antistickerupdateon], components: [button] });
        }

      case 'antisticker update disable':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antistickerupdate) {
          return message.channel.send({ embeds: [antistickerupdatealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antistickerupdate`, true);
          return message.channel.send({ embeds: [antistickerupdateoff], components: [button] });
        }

      case 'antiprune enable':
        if (premium.active !== true) {
          return message.channel.send(`Please buy premium to use this command! use ${prefix}premium purchase`)
        }
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (antiprune) {
          return message.channel.send({ embeds: [antiprunealreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_antiprune`, true);
          return message.channel.send({ embeds: [antipruneon], components: [button] });
        }

      case 'antiprune disable':
        if (premium.active !== true) {
          return message.channel.send(`Please buy premium to use this command! use ${prefix}premium purchase`)
        }
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!antiprune) {
          return message.channel.send({ embeds: [antiprunealreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_antiprune`, true);
          return message.channel.send({ embeds: [antipruneoff], components: [button] });
        }

      case 'autorecovery enable':
        if (premium.active !== true) {
          return message.channel.send(`Please buy premium to use this command! use ${prefix}premium purchase`)
        }
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (autorecovery) {
          return message.channel.send({ embeds: [autorecoveryalreadyon], components: [button] });
        } else {
          await client.db.set(`${message.guild.id}_autorecovery`, true);
          return message.channel.send({ embeds: [autorecoveryon], components: [button] });
        }

      case 'autorecovery disable':
        if (premium.active !== true) {
          return message.channel.send(`Please buy premium to use this command! use ${prefix}premium purchase`)
        }
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] });
        }
        if (!autorecovery) {
          return message.channel.send({ embeds: [autorecoveryalreadyoff], components: [button] });
        } else {
          await client.db.delete(`${message.guild.id}_autorecovery`, true);
          return message.channel.send({ embeds: [autorecoveryoff], components: [button] });
        }

      case 'whitelist show':
      case 'wl show':
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] });
        } else {
          return client.db.get(`${message.guild.id}_wl`).then(async (data) => {
            if (!data) {
              await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
              return message.channel.send({ embeds: [nodata] });
            } else {
              const users = data.whitelisted;

              if (users.length === 0) {
                return message.channel.send({ content: `${emoji.util.cross} | There are no whitelisted users in this server at the moment.` });
              }

              const itemsPerPage = 10;
              const totalPages = Math.ceil(users.length / itemsPerPage);
              let currentPage = 0;

              const generateEmbed = (page) => {
                const startIndex = page * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, users.length);
                const currentUsers = users.slice(startIndex, endIndex);
                const mentions = [];

                currentUsers.forEach((userId, i) => {
                  const member = client.users.cache.get(userId);
                  mentions.push(`\`[${startIndex + i + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | <@${userId}>`);
                });

                const wlistembed = new MessageEmbed()
                  .setColor(client.color)
                  .setAuthor(client.user.tag, client.user.displayAvatarURL())
                  .setTitle(`Total Whitelisted Users - Page ${currentPage + 1}/${totalPages}`)
                  .setDescription(mentions.join('\n'))
                  .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

                return wlistembed;
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

      case 'whitelist reset':
      case 'wl reset':

        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] });
        } else {
          return client.db.get(`${message.guild.id}_wl`).then(async (data) => {
            if (!data) {
              await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
              return message.channel.send({ embeds: [nodata] });
            } else {
              const users = data.whitelisted;
              if (users.length !== 0) {
                await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
                return message.channel.send({ content: `${emoji.util.tick} | All users have been successfully removed from the whitelist.` });
              } else {
                return message.channel.send({ content: `${emoji.util.cross} | There are currently no whitelisted users in this server.` });
              }
            }
          });
        }

      default:
        if (args[0] === 'whitelist') {
          return;
        }
        
        if (args[0] === 'wl') {
          return;
        }

        let msg = await message.channel.send({ embeds: [antiguidepg1], components: [pag] });
        let page = 0;

        let embedss = [];

        embedss.push(antiguidepg1);
        embedss.push(antiguidepg2);
        embedss.push(antiguidepg3);
        embedss.push(antiguidepg4);

        const collector = msg.createMessageComponentCollector({
          filter: (interaction) => {
            if (message.author.id === interaction.user.id) return true;
            else {
              return interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true });
            }
          },
          time: 60000,
        });

        function generateEmbed(page) {
          return embedss[page];
        }

        collector.on("collect", async (interaction) => {
          try {
            if (interaction.customId === "lol4") {
              page = page + 1 < embedss.length ? ++page : 0;
            } else if (interaction.customId === "lol5") {
              page = 3;
            } else if (interaction.customId === "lol3") {
              collector.stop();
              return;
            } else if (interaction.customId === "lol2") {
              page = page > 0 ? --page : embedss.length - 1;
            } else if (interaction.customId === "lol1") {
              page = 0;
            }

            const updatedEmbed = generateEmbed(page);

            const firstButton = pag.components.find((button) => button.customId === "lol1");
            const previousButton = pag.components.find((button) => button.customId === "lol2");
            const nextButton = pag.components.find((button) => button.customId === "lol4");
            const lastButton = pag.components.find((button) => button.customId === "lol5");

            firstButton.setDisabled(page === 0);
            previousButton.setDisabled(page === 0);
            nextButton.setDisabled(page === embedss.length - 1);
            lastButton.setDisabled(page === embedss.length - 1);

            interaction.update({ embeds: [updatedEmbed], components: [pag] });
          } catch (error) {
            console.error("An error occurred while handling the interaction:", error);
          }
        });

        collector.on("end", () => {
          pag.components.forEach((button) => {
            button.setDisabled(true);
          });

          msg.edit({ components: [pag] });
        });
        break;
    }
  }
}
