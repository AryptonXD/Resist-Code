const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  name: "terms",
  run: async (client, message, args) => {
    const embed1 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .setDescription(`Effective Date: \`July 18, 2023.\``)
      .addField(
        `1. Introduction`,
        `Welcome to ${client.user.username} ("the Bot"). These Terms and Conditions ("Terms") govern your use of the Bot and the services provided by the Bot. By using the Bot, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Bot.`
      )
      .setFooter(`${client.user.username} • Page 1/15`, client.user.displayAvatarURL());

    const embed2 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `2. License to Use`,
        `Subject to these Terms, we grant you a non-exclusive, revocable, non-transferable license to use the Bot for personal, non-commercial purposes. You may not use the Bot for any illegal or unauthorized purpose, nor may you, in the use of the Bot, violate any laws in your jurisdiction.`
      )
      .setFooter(`${client.user.username} • Page 2/15`, client.user.displayAvatarURL());

    const embed3 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `3. Bot Availability`,
        `We strive to ensure that the Bot is available at all times. However, we do not guarantee the continuous availability of the Bot, and we will not be liable for any downtime or interruptions in service.`
      )
      .setFooter(`${client.user.username} • Page 3/15`, client.user.displayAvatarURL());

    const embed4 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `4. User Conduct`,
        `You agree not to use the Bot to:\n
- Violate any applicable laws or regulations.
- Impersonate any person or entity or falsely state or otherwise misrepresent yourself.
- Interfere with or disrupt the operation of the Bot or servers.
- Transmit any viruses, worms, malware, or any other harmful or destructive content.
- Engage in any conduct that restricts or inhibits any other user from using or enjoying the Bot.
We reserve the right to terminate your access to the Bot for violating any of these rules.`
      )
      .setFooter(`${client.user.username} • Page 4/15`, client.user.displayAvatarURL());

    const embed5 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `5. Intellectual Property`,
        `The Bot and its original content, features, and functionality are owned by ${client.user.username} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        You may not reproduce, modify, distribute, or otherwise use any portion of the Bot without express written permission from us.`
      )
      .setFooter(`${client.user.username} • Page 5/15`, client.user.displayAvatarURL());

    const embed6 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `6. Termination`,
        `We may terminate or suspend your access to the Bot without prior notice or liability for any reason, including, but not limited to, your breach of these Terms or for any other conduct we deem unacceptable.
        All provisions of these Terms, which by their nature should survive termination, shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`
      )
      .setFooter(`${client.user.username} • Page 6/15`, client.user.displayAvatarURL());

    const embed7 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `7. Limitation of Liability`,
        `To the fullest extent permitted by applicable law, in no event shall ${client.user.username} or its developers be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from (i) your access to or use of or inability to access or use the Bot; (ii) any conduct or content of any third party on the Bot; (iii) any content obtained from the Bot; or (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed its essential purpose.`
      )
      .setFooter(`${client.user.username} • Page 7/15`, client.user.displayAvatarURL());

    const embed8 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `8. Indemnification`,
        `You agree to indemnify and hold harmless ${client.user.username} and its developers from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Bot or your violation of these Terms.`
      )
      .setFooter(`${client.user.username} • Page 8/15`, client.user.displayAvatarURL());

    const embed9 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `9. Modifications to the Bot`,
        `We reserve the right to modify or discontinue, temporarily or permanently, the Bot or any features or portions thereof without prior notice.
        We may also add new features or impose limits on certain features or restrict access to parts or all of the Bot without notice or liability.`
      )
      .setFooter(`${client.user.username} • Page 9/15`, client.user.displayAvatarURL());

    const embed10 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `10. Governing Law and Jurisdiction`,
        `These Terms shall be governed by and construed in accordance with the laws of Bharat, without regard to its conflict of laws principles.
        Any dispute arising out of or relating to these Terms or your access to or use of the Bot shall be subject to the exclusive jurisdiction of the courts located in Bharat.`
      )
      .setFooter(`${client.user.username} • Page 10/15`, client.user.displayAvatarURL());

    const embed11 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `11. Entire Agreement`,
        `These Terms constitute the entire agreement between you and ${client.user.username} regarding the use of the Bot and supersede all prior and contemporaneous agreements, understandings, negotiations, and discussions, whether oral or written.`
      )
      .setFooter(`${client.user.username} • Page 11/15`, client.user.displayAvatarURL());

    const embed12 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `12. Severability`,
        `If any provision of these Terms is found to be invalid or unenforceable under applicable law, such provision shall be modified or limited to the minimum extent necessary to make it valid and enforceable. The remaining provisions of these Terms will remain in full force and effect.`
      )
      .setFooter(`${client.user.username} • Page 12/15`, client.user.displayAvatarURL());

    const embed13 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `13. Waiver`,
        `The failure of ${client.user.username} to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
        Our failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision in that or any other instance.`
      )
      .setFooter(`${client.user.username} • Page 13/15`, client.user.displayAvatarURL());

    const embed14 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `14. Contact Information`,
        `If you have any questions or concerns about these Terms or the Bot, please contact us at plaguehelp247@gmail.com.`
      )
      .setFooter(`${client.user.username} • Page 14/15`, client.user.displayAvatarURL());

    const embed15 = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`Terms and Conditions for ${client.user.username}`, client.user.displayAvatarURL())
      .addField(
        `15. Acknowledgment`,
        `By using the Bot, you acknowledge that you have read these Terms and agree to be bound by them.`
      )
      .setFooter(`${client.user.username} • Page 15/15`, client.user.displayAvatarURL());

    const embeds = [embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8, embed9, embed10, embed11, embed12, embed13, embed14, embed15];
    const totalPages = embeds.length;
    let currentPage = 0;

    const pag = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("first")
        .setLabel("≪")
        .setDisabled(true),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("previous")
        .setLabel("Back")
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

    const disabledPagg = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("first")
        .setLabel("≪")
        .setDisabled(true),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("previous")
        .setLabel("Back")
        .setDisabled(true),
      new MessageButton()
        .setStyle("DANGER")
        .setCustomId("close")
        .setLabel("Close")
        .setDisabled(true),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("next")
        .setLabel("Next")
        .setDisabled(true),
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("last")
        .setLabel("≫")
        .setDisabled(true)
    );

    const generateEmbed = () => {
      const embed = embeds[currentPage];
      embed.setFooter(`${client.user.username} • Page ${currentPage + 1}/${totalPages}`, client.user.displayAvatarURL());
      return embed;
    };

    const sendMessage = async () => {
      const embed = generateEmbed();
      const messageComponent = await message.channel.send({ embeds: [embed], components: [pag] });
      return messageComponent;
    };

    const messageComponent = await sendMessage();

    const collector = messageComponent.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === message.author.id,
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
          messageComponent.edit({ components: [disabledPagg] });
          return;
        }

        const updatedEmbed = generateEmbed();

        const firstButton = pag.components.find((component) => component.customId === "first");
        const backButton = pag.components.find((component) => component.customId === "previous");
        const nextButton = pag.components.find((component) => component.customId === "next");
        const lastButton = pag.components.find((component) => component.customId === "last");

        if (currentPage === 0) {
          firstButton.setDisabled(true);
          backButton.setDisabled(true);
          nextButton.setDisabled(false);
          lastButton.setDisabled(false);
        } else if (currentPage === totalPages - 1) {
          firstButton.setDisabled(false);
          backButton.setDisabled(false);
          nextButton.setDisabled(true);
          lastButton.setDisabled(true);
        } else {
          firstButton.setDisabled(false);
          backButton.setDisabled(false);
          nextButton.setDisabled(false);
          lastButton.setDisabled(false);
        }

        interaction.update({ embeds: [updatedEmbed], components: [pag] });
      }
    });

    collector.on("end", async () => {
      const disabledPag = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("PRIMARY")
          .setCustomId("first")
          .setLabel("≪")
          .setDisabled(true),
        new MessageButton()
          .setStyle("SUCCESS")
          .setCustomId("previous")
          .setLabel("Back")
          .setDisabled(true),
        new MessageButton()
          .setStyle("DANGER")
          .setCustomId("close")
          .setLabel("Close")
          .setDisabled(true),
        new MessageButton()
          .setStyle("SUCCESS")
          .setCustomId("next")
          .setLabel("Next")
          .setDisabled(true),
        new MessageButton()
          .setStyle("PRIMARY")
          .setCustomId("last")
          .setLabel("≫")
          .setDisabled(true)
      );

      messageComponent.edit({ components: [disabledPag] });
    });
  },
};
