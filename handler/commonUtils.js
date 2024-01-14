const { MessageEmbed } = require("discord.js");

const createEmbed = (client, ID, added, allGuilds) => {
  const description = added
    ? `<a:ET_tick:1004003482312900608> | ${added} no prefix to <@${ID}> for ${allGuilds ? 'all guilds' : 'this guild'}`
    : `<a:ET_cross:1003992348205777036> | Already ${added ? 'added' : 'removed'} no prefix to <@${ID}> for ${allGuilds ? 'all guilds' : 'this guild'}`;

  return new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(description);
};

module.exports = { createEmbed };
