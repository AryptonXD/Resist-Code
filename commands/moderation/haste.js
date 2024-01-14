const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const sourcebin = require("sourcebin_js");

module.exports = {
  name: "haste",
  BotPerms: ['EMBED_LINKS'],
  run: async (client, message, args) => {
    message.delete();

    const content = args.join(" ");

      const bin = await sourcebin.create([
        {
          title: "JavaScript code",
          description: `This code was created in "${moment(message.createdAt).format("LLL")}"`,
          name: `Made By ${message.author.username}`,
          content,
          languageId: "javascript",
        },
      ]);

      const embed = new MessageEmbed()
        .setTitle("Hastebin")
        .setColor(client.color)
        .setDescription(`Code:\n\`\`\`javascript\n${content}\n\`\`\`\n[Click Here to View](${bin.url})`)
        .addField("Language", "JavaScript", true)
        .addField("Created By", message.author.username, true)
        .setFooter("Code created");

      message.channel.send({ embeds: [embed] });
  }
};
