const client = require('../index.js');
const { MessageEmbed } = require('discord.js');

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  try {
    const placeholders = {
      '<<server.member_count>>': newMember.guild.memberCount,
      '<<server.name>>': newMember.guild.name,
      '<<user.name>>': newMember.user.username,
      '<<user.mention>>': newMember.toString(),
      '<<user.created_at>>': newMember.user.createdAt.toDateString(),
      '<<user.boosted_at>>': newMember.premiumSince ? newMember.premiumSince.toDateString() : 'Not boosting',
    };

    if (!oldMember.premiumSince && newMember.premiumSince) {
      const welcomeEmbedData = await client.db9.get(`${newMember.guild.id}_boost_embed`);
      let welcomeMessage = await client.db9.get(`${newMember.guild.id}_boost_message`);
      const channelId = await client.db9.get(`${newMember.guild.id}_boost_channel`);
      const guildId = await client.db9.get(`${newMember.guild.id}_boost`);

      if (newMember.guild.id !== guildId) return;

      const boostChannel = newMember.guild.channels.cache.get(channelId);

      if (boostChannel) {
        if (welcomeEmbedData) {
          const { title = '', description = '', color, thumbnail, image, footer } = welcomeEmbedData.embed;

          const replacePlaceholders = (text) => {
            if (typeof text === 'string') {
              for (const [placeholder, replacement] of Object.entries(placeholders)) {
                const regex = new RegExp(placeholder, 'g');
                text = text.replace(regex, replacement);
              }
            }
            return text;
          };

          if (welcomeMessage !== null) {
            welcomeMessage = welcomeMessage.toString();
            welcomeMessage = replacePlaceholders(welcomeMessage);
          } else {
            welcomeMessage = '';
          }

          const titleReplaced = replacePlaceholders(title);
          const descriptionReplaced = replacePlaceholders(description) || 'No description available';
          const footerReplaced = replacePlaceholders(footer.text) || '';

          const welcomeEmbed = new MessageEmbed()
            .setColor(color || client.color)
            .setTitle(titleReplaced)
            .setDescription(descriptionReplaced);

          if (thumbnail) {
            welcomeEmbed.setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }));
          }
          if (image) {
            welcomeEmbed.setImage(image);
          }
          if (footerReplaced) {
            welcomeEmbed.setFooter(footerReplaced);
          }

          if (welcomeMessage.trim()) {
            boostChannel.send({ content: welcomeMessage, embeds: [welcomeEmbed] });
          } else {
            boostChannel.send({ embeds: [welcomeEmbed] });
          }
        } else if (welcomeMessage !== null) {
          const replacePlaceholders = (text) => {
            for (const [placeholder, replacement] of Object.entries(placeholders)) {
              const regex = new RegExp(placeholder, 'g');
              text = text.replace(regex, replacement);
            }
            return text;
          };

          welcomeMessage = replacePlaceholders(welcomeMessage);

          boostChannel.send({ content: welcomeMessage });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});
