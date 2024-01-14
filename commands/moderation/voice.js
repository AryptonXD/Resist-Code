const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emoji = require('../../emoji.js');
const Settings = require('../../settings.js');
const owner = Settings.bot.credits.developerId;

module.exports = {
  name: 'voice',
  voteOnly: true,
  UserPerms: ['MUTE_MEMBERS', 'DEAFEN_MEMBERS'],
  BotPerms: ['DEAFEN_MEMBERS', 'MUTE_MEMBERS', 'EMBED_LINKS'],
  aliases: ["vc"],
  run: async (client, message, args) => {
    let prefix = await client.db8.get(`${message.guild.id}_prefix`);
    if (!prefix) prefix = Settings.bot.info.prefix;
    const arypton = await client.users.fetch(owner);
    const option = args[0];
    const channels = message.guild.channels.cache.get(args[0]) || message.member.voice.channel || message.channel;
    const channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    const mentionchannel = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Mention the channel first`);

    const mentionsomeone = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Mention someone first`);

    const guide = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addField(
        `${emoji.util.arrow} \`voice muteall\``,
        "Mute all members in a voice channel"
      )
      .addField(
        `${emoji.util.arrow} \`voice unmuteall\``,
        "Unmute all members in a voice channel"
      )
      .addField(
        `${emoji.util.arrow} \`voice deafenall\``,
        "Deafen all members in a voice channel"
      )
      .addField(
        `${emoji.util.arrow} \`voice undeafenall\``,
        "Undeafen all members in a voice channel"
      )
      .addField(
        `${emoji.util.arrow} \`voice mute <user>\``,
        "Mute a member in a voice channel"
      )
      .addField(
        `${emoji.util.arrow} \`voice unmute <user>\``,
        "Unmute a member in a voice channel"
      )
      .addField(
        `${emoji.util.arrow} \`voice deafen <user>\``,
        "Deafen a member in a voice channel"
      )
      .addField(
        `${emoji.util.arrow} \`voice undeafen <user>\``,
        "Undeafen a member in a voice channel"
      )
      .setFooter(`Made by ${arypton.username} with 💞`, `${arypton.displayAvatarURL({ dynamic: true })}`);

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Vote Me")
        .setStyle("LINK")
        .setURL(`https://top.gg/bot/1002306671261003948?s=0ae05abf3185d`),
      new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=1002306671261003948&permissions=8&scope=bot%20applications.commands`)
    );

    if (!option) {
      return message.channel.send({ embeds: [guide], components: [button] });
    }

    async function muteAllMembers(channel) {
      const mentionedUsers = [];
      channel.members.forEach((member) => {
        member.voice.setMute(true);
        mentionedUsers.push(member);
      });
      const muteallWithMentions = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`\`${channel.name}\` ${emoji.util.tick} All members in your channel have been muted`)
        .addField("Muted Members:", mentionedUsers.map(user => user.toString()).join(", "));
      message.channel.send({ embeds: [muteallWithMentions] });
    }

    async function unmuteAllMembers(channel) {
      const mentionedUsers = [];
      channel.members.forEach((member) => {
        member.voice.setMute(false);
        mentionedUsers.push(member);
      });
      const unmuteallWithMentions = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`\`${channel.name}\` ${emoji.util.tick} All members in your channel have been unmuted`)
        .addField("Unmuted Members:", mentionedUsers.map(user => user.toString()).join(", "));
      message.channel.send({ embeds: [unmuteallWithMentions] });
    }

    async function deafenAllMembers(channel) {
      const mentionedUsers = [];
      channel.members.forEach((member) => {
        member.voice.setDeaf(true);
        mentionedUsers.push(member);
      });
      const deafallWithMentions = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`\`${channel.name}\` ${emoji.util.tick} All members in your channel have been deafened`)
        .addField("Deafened Members:", mentionedUsers.map(user => user.toString()).join(", "));
      message.channel.send({ embeds: [deafallWithMentions] });
    }

    async function undeafenAllMembers(channel) {
      const mentionedUsers = [];
      channel.members.forEach((member) => {
        member.voice.setDeaf(false);
        mentionedUsers.push(member);
      });
      const undeafallWithMentions = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`\`${channel.name}\` ${emoji.util.tick} All members in your channel have been undeafened`)
        .addField("Undeafened Members:", mentionedUsers.map(user => user.toString()).join(", "));
      message.channel.send({ embeds: [undeafallWithMentions] });
    }

    async function muteMember(member) {
      member.voice.setMute(true);
      const muteeWithMention = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Member Muted: ${member}`);
      message.channel.send({ embeds: [muteeWithMention] });
    }

    async function unmuteMember(member) {
      member.voice.setMute(false);
      const unmuteeWithMention = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Member Unmuted: ${member}`);
      message.channel.send({ embeds: [unmuteeWithMention] });
    }

    async function deafenMember(member) {
      member.voice.setDeaf(true);
      const deaffWithMention = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Member Deafened: ${member}`);
      message.channel.send({ embeds: [deaffWithMention] });
    }

    async function undeafenMember(member) {
      member.voice.setDeaf(false);
      const undeaffWithMention = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`${emoji.util.tick} | Member Undeafened: ${member}`);
      message.channel.send({ embeds: [undeaffWithMention] });
    }

    switch (option) {
      case 'muteall':
        if (!channel) {
          return message.channel.send({ embeds: [mentionchannel] });
        }
        await muteAllMembers(channel);
        break;

      case 'unmuteall':
        if (!channel) {
          return message.channel.send({ embeds: [mentionchannel] });
        }
        await unmuteAllMembers(channel);
        break;

      case 'deafenall':
        if (!channel) {
          return message.channel.send({ embeds: [mentionchannel] });
        }
        await deafenAllMembers(channel);
        break;

      case 'undeafenall':
        if (!channel) {
          return message.channel.send({ embeds: [mentionchannel] });
        }
        await undeafenAllMembers(channel);
        break;

      case 'mute':
        if (!member) {
          return message.channel.send({ embeds: [mentionsomeone] });
        }
        await muteMember(member);
        break;

      case 'unmute':
        if (!member) {
          return message.channel.send({ embeds: [mentionsomeone] });
        }
        await unmuteMember(member);
        break;

      case 'deafen':
        if (!member) {
          return message.channel.send({ embeds: [mentionsomeone] });
        }
        await deafenMember(member);
        break;

      case 'undeafen':
        if (!member) {
          return message.channel.send({ embeds: [mentionsomeone] });
        }
        await undeafenMember(member);
        break;

      default:
        return message.channel.send({ embeds: [guide], components: [button] });
    }
  }
}
