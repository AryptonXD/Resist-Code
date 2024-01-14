const Discord = require("discord.js");
const emoji = require('../../emoji.js');

async function addEmoji(client, message, args) {
  try {
    const isUrl = require("is-url");
    const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi;

    const emoteMatch = args.join(" ").match(emojiRegex);
    let type, name, emote, emoji, Link;

    if (emoteMatch) {
      emote = emoteMatch[0];
      type = "emoji";
      name = args
        .join(" ")
        .replace(emojiRegex, "")
        .trim()
        .split(" ")[0];
      emoji = Discord.Util.parseEmoji(emote);
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
        emoji.animated ? "gif" : "png"
      }`;
    } else {
      emote = `${args.find(arg => isUrl(arg))}`;
      name = args.find(arg => arg != emote);
      type = "url";
      if (!name) return message.channel.send("Please provide a emoji or emoji link!");
      Link = message.attachments.first()
        ? message.attachments.first().url
        : emote;
    }

    const newEmoji = await message.guild.emojis.create(Link, `${name || emoji.name}`);
    message.channel.send(`${newEmoji.toString()} added!`);
  } catch (error) {
    console.error(error);
    message.channel.send(`${emoji.util.cross} | An error occurred while adding the emoji.`);
  }
}

module.exports = {
  name: "steal",
  description: "Add Emoji",
  usage: "add <emoji>",
  UserPerms: [`MANAGE_EMOJIS`],
  BotPerms: [`MANAGE_EMOJIS`, `EMBED_LINKS`],
  VoteOnly: true,
  run: async (client, message, args) => {
    await addEmoji(client, message, args);
  }
};
