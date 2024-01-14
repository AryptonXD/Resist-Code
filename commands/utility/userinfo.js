const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emoji = require('../../emoji.js');

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user", "ui"],
  run: async (client, message, args) => {
    const permissions = { "CREATE_INSTANT_INVITE": "Create Instant Invite", "KICK_MEMBERS": "Kick Members", "BAN_MEMBERS": "Ban Members", "ADMINISTRATOR": "Administrator", "MANAGE_CHANNELS": "Manage Channels", "MANAGE_GUILD": "Manage Server", "ADD_REACTIONS": "Add Reactions", "VIEW_AUDIT_LOG": "View Audit Log", "PRIORITY_SPEAKER": "Priority Speaker", "STREAM": "Stream", "VIEW_CHANNEL": "View Channel", "SEND_MESSAGES": "Send Messages", "SEND_TTS_MESSAGES": "Send TTS Messages", "MANAGE_MESSAGES": "Manage Messages", "EMBED_LINKS": "Embed Links", "ATTACH_FILES": "Attach Files", "READ_MESSAGE_HISTORY": "Read Message History", "MENTION_EVERYONE": "Mention Everyone", "USE_EXTERNAL_EMOJIS": "Use External Emojis", "VIEW_GUILD_INSIGHTS": "View Server Insights", "CONNECT": "Connect", "SPEAK": "Speak", "MUTE_MEMBERS": "Mute Members", "DEAFEN_MEMBERS": "Deafen Members", "MOVE_MEMBERS": "Move Members", "USE_VAD": "Use Voice Activity", "CHANGE_NICKNAME": "Change Nickname", "MANAGE_NICKNAMES": "Manage Nicknames", "MANAGE_ROLES": "Manage Roles", "MANAGE_WEBHOOKS": "Manage Webhooks", "MANAGE_EMOJIS": "Manage Emojis", "USE_SLASH_COMMANDS": "Use Slash Commands", "REQUEST_TO_SPEAK": "Request to Speak", "MANAGE_THREADS": "Manage Threads", "USE_PUBLIC_THREADS": "Use Public Threads", "USE_PRIVATE_THREADS": "Use Private Threads", "USE_EXTERNAL_STICKERS": "Use External Stickers" };

    var flags = { "TIER1": `${emoji.flag.nitro}`, "TIER2": `${emoji.flag.nitro}`, "ACTIVE_DEVELOPER": `${emoji.flag.activedev}`, "DISCORD_EMPLOYEE": `${emoji.flag.staff}`, "DISCORD_PARTNER": `${emoji.flag.partner}`, "BUGHUNTER_LEVEL_1": `${emoji.flag.bug1}`, "BUGHUNTER_LEVEL_2": `${emoji.flag.bug2}`, "HYPESQUAD_EVENTS": `${emoji.flag.hypesquad}`, "HOUSE_BRILLIANCE": `${emoji.flag.hype1}`, "HOUSE_BRAVERY": `${emoji.flag.hype2}`, "HOUSE_BALANCE": `${emoji.flag.hype3}`, "EARLY_SUPPORTER": `${emoji.badges.supporter}`, "VERIFIED_BOT": `${emoji.flag.verifiedbot}`, "EARLY_VERIFIED_DEVELOPER": `${emoji.flag.verifieddev}`, "BOOSTER_LEVEL_1": `${emoji.flag.booster}`, "BOOSTER_LEVEL_2": `${emoji.flag.booster}`, "BOOSTER_LEVEL_3": `${emoji.flag.booster}`, "BOOSTER_LEVEL_4": `${emoji.flag.booster}`, "BOOSTER_LEVEL_5": `${emoji.flag.booster}`, "BOOSTER_LEVEL_6": `${emoji.flag.booster}`, "BOOSTER_LEVEL_7": `${emoji.flag.booster}`, "BOOSTER_LEVEL_8": `${emoji.flag.booster}`, "BOOSTER_LEVEL_9": `${emoji.flag.booster}` };

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const registrationDate = `<t:${Math.floor(member.user.createdAt / 1000)}:F> [<t:${Math.floor(member.user.createdAt / 1000)}:R>]`;
    const avatarURL = member.user.displayAvatarURL({ dynamic: true });
    const isAnimated = avatarURL.endsWith(".gif");
    const nick = member.user.nickname || "None";
    const downloadLink = `[Click Me](${avatarURL})`;
    const roles = member.roles.cache;
    const roleCount = roles.size;
    const rolesText = roleCount > 20 ? "Too many roles to show" : (roles.map(role => role.name).join(', ') || "No Roles");
    const serverName = message.guild.name;
    const joinedDate = `<t:${Math.floor(member.joinedAt / 1000)}:F> [<t:${Math.floor(member.joinedAt / 1000)}:R>]`;
    const mentionPermissions = member.permissions.toArray() || [];
    const userFlags = member.user.flags.toArray() || "No Badges";
    const isServerOwner = message.guild.ownerId === member.id;
    const isAdmin = member.permissions.has("ADMINISTRATOR");
    const isBot = member.user.bot;
    let acknowledgementsText = "Server Member";
    if (isServerOwner) acknowledgementsText = "Server Owner";
    else if (isAdmin && !isBot) acknowledgementsText = "Server Admin";
    else if (isBot) acknowledgementsText = "Server Bot";
    const boosterStatus = member.premiumSince ? `${emoji.util.tick}` : `${emoji.util.cross}`;
    const boostingSince = member.premiumSince
      ? `<t:${Math.floor(member.premiumSince / 1000)}:F> [<t:${Math.floor(member.premiumSince / 1000)}:R>]`
      : "Not Boosting";
    const finalPermissions = Object.keys(permissions).filter(permission => mentionPermissions.includes(permission)).map(permission => permissions[permission]);

    const createButton = (label, style, customId, disabled) => {
      return new MessageButton().setStyle(style).setCustomId(customId).setLabel(label).setDisabled(disabled);
    };

    const createRow = (buttons) => {
      return new MessageActionRow().addComponents(...buttons);
    };

    const button1 = createRow([
      createButton("Account", "SUCCESS", "first", true),
      createButton("Guild", "SECONDARY", "second", false),
      createButton("Roles", "SECONDARY", "third", false),
      createButton("Permissions", "SECONDARY", "fourth", false)
    ]);

    const button2 = createRow([
      createButton("Account", "SECONDARY", "first", false),
      createButton("Guild", "SUCCESS", "second", true),
      createButton("Roles", "SECONDARY", "third", false),
      createButton("Permissions", "SECONDARY", "fourth", false)
    ]);

    const button3 = createRow([
      createButton("Account", "SECONDARY", "first", false),
      createButton("Guild", "SECONDARY", "second", false),
      createButton("Roles", "SUCCESS", "third", true),
      createButton("Permissions", "SECONDARY", "fourth", false)
    ]);

    const button4 = createRow([
      createButton("Account", "SECONDARY", "first", false),
      createButton("Guild", "SECONDARY", "second", false),
      createButton("Roles", "SECONDARY", "third", false),
      createButton("Permissions", "SUCCESS", "fourth", true)
    ]);

    const button5 = createRow([
      createButton("Account", "DANGER", "first", true),
      createButton("Guild", "DANGER", "second", true),
      createButton("Roles", "DANGER", "third", true),
      createButton("Permissions", "DANGER", "fourth", true)
    ]);

    const createEmbed = (fields) => {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

      fields.forEach((field) => {
        if (field.value) {
          embed.addField(field.name, field.value);
        }
      });

      return embed;
    };


    const embed1 = createEmbed([
      { name: "General Information", value: `**Username:** ${member.user.username}\n**Display Name:** ${member.displayName}\n**ID:** ${member.id}\n**Registered:** ${registrationDate}\n**Is Bot?**: ${member.user.bot ? `${emoji.util.tick}` : `${emoji.util.cross}`}\n**Badges**: ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}` },
      { name: "__Profile Picture__", value: `**Animated**: ${isAnimated ? `${emoji.util.tick}` : `${emoji.util.cross}`}\n**Download**: [Click Me](${avatarURL})` }
    ]);

    const embed2 = createEmbed([
      { name: `Information in ${serverName}`, value: `**Joined**: ${joinedDate}\n**Nickname**: ${nick}\n**Booster**: ${boosterStatus}\n**Boosting Since**: ${boostingSince}\n**Acknowledgements**: ${acknowledgementsText}` }
    ]);

    const embed3 = createEmbed([
      { name: "__Role Info__", value: `**Highest Role**: ${member.roles.highest}\n**Roles**: ${rolesText}\n**Color**: ${member.displayHexColor}` }
    ]);

    const embed4 = createEmbed([
      { name: "__Permissions__", value: `${finalPermissions.join(', ')}` }
    ]);

    const messageComponent = await message.channel.send({ embeds: [embed1], components: [button1] });

    const collector = messageComponent.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true });
          return false;
        }
      },
      time: 600000,
      idle: 800000 / 2,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.isButton()) {
        switch (interaction.customId) {
          case "first":
            interaction.update({ embeds: [embed1], components: [button1] });
            break;
          case "second":
            interaction.update({ embeds: [embed2], components: [button2] });
            break;
          case "third":
            interaction.update({ embeds: [embed3], components: [button3] });
            break;
          case "fourth":
            interaction.update({ embeds: [embed4], components: [button4] });
            break;
        }
      }
    });

    collector.on("end", () => {
      messageComponent.edit({ components: [button5] });
    });
  }
};
