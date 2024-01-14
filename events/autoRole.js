const client = require('../index.js');

client.on("guildMemberAdd", async (member) => {
  const dbKey = `${member.guild.id}_autorole`;
  const data = await client.db1.get(dbKey);

  if (!data) {
    return;
  }

  const { role: { humans, bots } } = data;

  if (member.user.bot && bots.length > 0) {
    for (const botRoleID of bots) {
      const botRole = member.guild.roles.cache.get(botRoleID);
      const botHighestRole = member.guild.me.roles.highest;
      const rolePosition = botRole.comparePositionTo(botHighestRole);
      if (botRole) {
          if (rolePosition >= 0) return;
        member.roles.add(botRole);
      }
    }
  } else if (!member.user.bot && humans.length > 0) {
    for (const humanRoleID of humans) {
      const humanRole = member.guild.roles.cache.get(humanRoleID);
      const botHighestRole = member.guild.me.roles.highest;
      const rolePosition = humanRole.comparePositionTo(botHighestRole);
      if (humanRole) {
          if (rolePosition >= 0) return;
        member.roles.add(humanRole);
      }
    }
  }
});
