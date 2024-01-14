const client = require('../index.js');
const { MessageEmbed } = require('discord.js');

client.on('guildMemberRemove', async (member) => {
  try {
    const placeholders = {
      '<<server.member_count>>': member.guild.memberCount,
      '<<server.name>>': member.guild.name,
      '<<user.name>>': member.user.username,
      '<<user.mention>>': member.toString(),
      '<<user.created_at>>': member.user.createdAt.toDateString(),
      '<<user.joined_at>>': member.joinedAt.toDateString(),
    };

    const leaveEmbedData = await client.db9.get(`${member.guild.id}_leave_embed`);
    let leaveMessage = await client.db9.get(`${member.guild.id}_leave_message`);
    const channelId = await client.db9.get(`${member.guild.id}_leave_channel`);
    const guildId = await client.db9.get(`${member.guild.id}_leave`);

    if (member.guild.id !== guildId) return;

    const leaveChannel = member.guild.channels.cache.get(channelId);

    if (leaveChannel) {
      if (leaveEmbedData) {
        const { title = '', description = '', color, thumbnail, image, footer } = leaveEmbedData.embed;

        const replacePlaceholders = (text) => {
          if (typeof text === 'string') {
            for (const [placeholder, replacement] of Object.entries(placeholders)) {
              const regex = new RegExp(placeholder, 'g');
              text = text.replace(regex, replacement);
            }
          }
          return text;
        };

        if (leaveMessage !== null) {
          leaveMessage = leaveMessage.toString();
          leaveMessage = replacePlaceholders(leaveMessage);
        } else {
          leaveMessage = '';
        }

        const titleReplaced = replacePlaceholders(title);
        const descriptionReplaced = replacePlaceholders(description) || 'No description available';
        const footerReplaced = replacePlaceholders(footer.text) || '';

        const leaveEmbed = new MessageEmbed()
          .setColor(color || client.color)
          .setTitle(titleReplaced)
          .setDescription(descriptionReplaced);

        if (thumbnail) {
          leaveEmbed.setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
        }
        if (image) {
          leaveEmbed.setImage(image);
        }
        if (footerReplaced) {
          leaveEmbed.setFooter(footerReplaced);
        }

        if (leaveMessage.trim()) {
          leaveChannel.send({ content: leaveMessage, embeds: [leaveEmbed] });
        } else {
          leaveChannel.send({ embeds: [leaveEmbed] });
        }
      } else if (leaveMessage !== null) {
        const replacePlaceholders = (text) => {
          for (const [placeholder, replacement] of Object.entries(placeholders)) {
            const regex = new RegExp(placeholder, 'g');
            text = text.replace(regex, replacement);
          }
          return text;
        };

        leaveMessage = replacePlaceholders(leaveMessage);

        leaveChannel.send({ content: leaveMessage });
      }
    }
  } catch (error) {
    console.error(error);
  }
});
