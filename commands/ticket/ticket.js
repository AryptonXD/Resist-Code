const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const Discord = require('discord.js');
const Settings = require('../../settings.js');

module.exports = {
  name: 'ticket',
  UserPerms: ['ADMINISTRATOR'],
  BotPerms: ['EMBED_LINKS'],
  run: async (client, message, args) => {
    let prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;

    const bodyTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Body')
      .setCustomId('body_ticket');

    const miscTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Misc')
      .setCustomId('misc_ticket');

    const titleTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Title')
      .setCustomId('title_ticket');

    const descriptionTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Description')
      .setCustomId('description_ticket');

    const thumbnailTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Thumbnail')
      .setCustomId('thumbnail_ticket');

    const imageTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Image')
      .setCustomId('image_ticket');

    const footerTextTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Footer Text')
      .setCustomId('footer_text_ticket');

    const footerIconTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Footer Icon')
      .setCustomId('footer_icon_ticket');

    const colorTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Color')
      .setCustomId('color_ticket');

    const authorTextTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Author Text')
      .setCustomId('author_text_ticket');

    const authorIconTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Author Icon')
      .setCustomId('author_icon_ticket');

    const defaultTicket = new MessageButton()
      .setStyle(1)
      .setLabel('Default')
      .setCustomId('default_ticket');

    const previewButton = new MessageButton()
      .setStyle(2)
      .setLabel('Preview')
      .setCustomId('preview_ticket');

    const sendButton = new MessageButton()
      .setStyle(3)
      .setLabel('Save')
      .setCustomId('save_ticket');

    const abortButton = new MessageButton()
      .setStyle(4)
      .setLabel('Abort')
      .setCustomId('abort_ticket');

    const backTicket = new MessageButton()
      .setStyle(3)
      .setLabel('Back')
      .setCustomId('back_ticket');

    const styleTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Button Color')
      .setCustomId('style_ticket');

    const createTicket = new MessageButton()
      .setStyle(2)
      .setLabel('Create Ticket')
      .setEmoji('1154616234680275076')
      .setDisabled(true)
      .setCustomId('create_ticket');

    const button1 = new MessageActionRow().addComponents(bodyTicket, miscTicket, previewButton, sendButton, abortButton);
    const button2 = new MessageActionRow().addComponents(authorTextTicket, authorIconTicket, titleTicket, descriptionTicket, thumbnailTicket);
    const button3 = new MessageActionRow().addComponents(imageTicket, footerTextTicket, footerIconTicket, colorTicket, defaultTicket);
    const button4 = new MessageActionRow().addComponents(backTicket);
    const button5 = new MessageActionRow().addComponents(styleTicket, backTicket);
    const button6 = new MessageActionRow().addComponents(createTicket);

    switch (args.join(" ")) {
      case 'setup panel':

        const guideTicket = new MessageEmbed()
          .setColor(client.color)
          .setTitle('')
          .setAuthor('', null, null)
          .setFooter('', null)
          .setThumbnail(null)
          .setImage(null)
          .setDescription('Default Ticket Embed Description');

        const messageComponent = await message.channel.send({ embeds: [guideTicket], components: [button1] });

        const collector = messageComponent.createMessageComponentCollector({
          filter: (interaction) => interaction.user.id === message.author.id,
          time: 400000,
          idle: 400000 / 2,
        });

        collector.on('collect', async (interaction) => {
          if (interaction.isButton()) {
            if (interaction.customId === 'body_ticket') {
              await interaction.update({ components: [button2, button3, button4] });
            } else if (interaction.customId === 'misc_ticket') {
              await interaction.update({ components: [button5] })
            } else if (interaction.customId === 'title_ticket') {
              await interaction.reply({ content: `Please provide a Title for Ticket Embed below maximum character limit is 250`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const titleTicket = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();
                guideTicket.setTitle(titleTicket);
                messageComponent.edit({ embeds: [guideTicket] });
              });
            } else if (interaction.customId === 'description_ticket') {
              await interaction.reply({ content: `Please provide a description for Ticket Embed below maximum character limit is 2048`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 300000
              });

              messageCollector.on('collect', async collectedMessage => {
                const titleDescription = collectedMessage.content.slice(0, 2048);
                collectedMessage.delete();
                guideTicket.setDescription(titleDescription);
                messageComponent.edit({ embeds: [guideTicket] });
              });
            } else if (interaction.customId === 'color_ticket') {
              await interaction.reply({ content: `Please provide a Color for Ticket Embed below and it should be hex code (#000000)`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const colorInput = collectedMessage.content;
                collectedMessage.delete();

                const colorRegex = /^#([0-9A-Fa-f]{6})$/;
                if (!colorRegex.test(colorInput)) {
                  return message.channel.send("Invalid hex color code. Please use a format like '#000000'.");
                }

                const hexColor = colorInput.toUpperCase();
                guideTicket.setColor(hexColor);
                messageComponent.edit({ embeds: [guideTicket] });
              });
            } else if (interaction.customId === 'author_text_ticket') {
              await interaction.reply({ content: `Please provide an Author for the Ticket Embed below. The maximum character limit is 250.`, ephemeral: true });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              let authorName = '';
              const authorIcon = guideTicket.author ? guideTicket.author.iconURL : null;

              messageCollector.on('collect', async (collectedMessage) => {
                authorName = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();

                if (!guideTicket.author) {
                  guideTicket.setAuthor(authorName, authorIcon, null);
                } else {
                  guideTicket.setAuthor(authorName, guideTicket.author.iconURL, guideTicket.author.url);
                }

                messageComponent.edit({ embeds: [guideTicket] });
              });
            } else if (interaction.customId === 'author_icon_ticket') {
              await interaction.reply({
                content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif) for the author icon, or type 'none' to remove the image.`,
                ephemeral: true,
              });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (guideTicket.author && guideTicket.author.iconURL !== null) {
                    guideTicket.setAuthor(guideTicket.author.name, null, null);
                    await interaction.followUp({ content: 'Author icon removed successfully.', ephemeral: true });
                    messageComponent.edit({ embeds: [guideTicket] });
                  } else {
                    await interaction.followUp({ content: 'There is no author icon to remove.', ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({
                      content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the author icon.",
                      ephemeral: true,
                    });
                  }

                  collectedMessage.delete();

                  if (!guideTicket.author) {
                    guideTicket.setAuthor('', imageInput, null);
                  } else {
                    guideTicket.setAuthor(guideTicket.author.name, imageInput, guideTicket.author.url);
                  }

                  await interaction.followUp({ content: 'Author icon added successfully.', ephemeral: true });
                  messageComponent.edit({ embeds: [guideTicket] });
                }
              });
            } else if (interaction.customId === 'footer_text_ticket') {
              await interaction.reply({ content: `Please provide a footer for the Ticket Embed below. The maximum character limit is 250`, ephemeral: true });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const footerText = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();

                if (!guideTicket.footer) {
                  guideTicket.setFooter(footerText, null);
                } else {
                  guideTicket.setFooter(footerText, guideTicket.footer.iconURL);
                }

                messageComponent.edit({ embeds: [guideTicket] });
              });
            } else if (interaction.customId === 'footer_icon_ticket') {
              await interaction.reply({
                content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif) for the footer icon, or type 'none' to remove the image.`,
                ephemeral: true,
              });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (guideTicket.footer && guideTicket.footer.iconURL !== null) {
                    guideTicket.setFooter(guideTicket.footer.text, null);
                    await interaction.followUp({ content: 'Footer icon removed successfully.', ephemeral: true });
                    messageComponent.edit({ embeds: [guideTicket] });
                  } else {
                    await interaction.followUp({ content: 'There is no footer icon to remove.', ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({
                      content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the footer icon.",
                      ephemeral: true,
                    });
                  }

                  collectedMessage.delete();

                  if (!guideTicket.footer) {
                    guideTicket.setFooter('', imageInput);
                  } else {
                    guideTicket.setFooter(guideTicket.footer.text, imageInput);
                  }

                  await interaction.followUp({ content: 'Footer icon added successfully.', ephemeral: true });
                  messageComponent.edit({ embeds: [guideTicket] });
                }
              });
            } else if (interaction.customId === 'image_ticket') {
              await interaction.reply({ content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the image.`, ephemeral: true });

              const messageCollectorFilter = msg => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (guideTicket.image !== null) {
                    guideTicket.setImage(null);
                    await interaction.followUp({ content: "Image removed successfully.", ephemeral: true });
                    messageComponent.edit({ embeds: [guideTicket] });
                  } else {
                    await interaction.followUp({ content: "There is no image to remove.", ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({ content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the image.", ephemeral: true });
                  }

                  collectedMessage.delete();
                  guideTicket.setImage(imageInput);
                  isImageSet = true;
                  await interaction.followUp({ content: "Thumbnail added successfully.", ephemeral: true });
                  messageComponent.edit({ embeds: [guideTicket] });
                }
              });
            } else if (interaction.customId === 'thumbnail_ticket') {
              await interaction.reply({ content: `Please provide a valid thumbnail image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the thumbnail.`, ephemeral: true });

              const messageCollectorFilter = msg => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const thumbnailInput = collectedMessage.content;

                if (thumbnailInput.toLowerCase() === 'none') {
                  if (guideTicket.thumbnail) {
                    guideTicket.setThumbnail(null);
                    await interaction.followUp({ content: "Thumbnail removed successfully.", ephemeral: true });
                    messageComponent.edit({ embeds: [guideTicket] });
                  } else {
                    await interaction.followUp({ content: "There is no thumbnail to remove.", ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(thumbnailInput)) {
                    return interaction.followUp({ content: "Invalid image URL. Please provide a valid thumbnail image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the thumbnail.", ephemeral: true });
                  }

                  collectedMessage.delete();
                  guideTicket.setThumbnail(thumbnailInput);
                  await interaction.followUp({ content: "Thumbnail added successfully.", ephemeral: true });
                  messageComponent.edit({ embeds: [guideTicket] });
                }
              });
            } else if (interaction.customId === 'default_ticket') {
              guideTicket.setColor(client.color);
              guideTicket.setTitle('');
              guideTicket.setDescription('Default Ticket Embed Description');
              guideTicket.setAuthor('', null, null);
              guideTicket.setFooter('', null);
              guideTicket.setThumbnail(null);
              guideTicket.setImage(null);
              createTicket.setStyle(2);
              messageComponent.edit({ embeds: [guideTicket], components: [button1] });
              await interaction.reply({ content: 'Embed has been reset to the default state.', ephemeral: true });
            } else if (interaction.customId === 'preview_ticket') {
              await interaction.reply({ embeds: [guideTicket], ephemeral: true });
            } else if (interaction.customId === 'back_ticket') {
              await interaction.update({ components: [button1] })
            } else if (interaction.customId === 'style_ticket') {

              const blue = new MessageButton()
                .setCustomId('style_selected_blue')
                .setLabel('Blue')
                .setStyle('PRIMARY');

              const grey = new MessageButton()
                .setCustomId('style_selected_grey')
                .setLabel('Grey')
                .setStyle('SECONDARY');

              const green = new MessageButton()
                .setCustomId('style_selected_green')
                .setLabel('Green')
                .setStyle('SUCCESS');

              const red = new MessageButton()
                .setCustomId('style_selected_red')
                .setLabel('Red')
                .setStyle('DANGER');

              const type = new MessageActionRow().addComponents(blue, grey, green, red)

              messageComponent.edit({ components: [type] });
              await interaction.reply({ content: 'Please choose a style for the "Create Ticket" button (blue, grey, green, red).', ephemeral: true });
            } else if (interaction.customId === 'style_selected_blue') {
              createTicket.setStyle(1);
              await messageComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Blue.', ephemeral: true });
            } else if (interaction.customId === 'style_selected_grey') {
              createTicket.setStyle(2);
              await messageComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Grey.', ephemeral: true });
            } else if (interaction.customId === 'style_selected_green') {
              createTicket.setStyle(3);
              await messageComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Green.', ephemeral: true });
            } else if (interaction.customId === 'style_selected_red') {
              createTicket.setStyle(4);
              await messageComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Red.', ephemeral: true });
            } else if (interaction.customId === 'save_ticket') {
              await client.db16.set(`${message.guild.id}_ticket_embed`, {
                authorText: guideTicket.author.name,
                authorIcon: guideTicket.author.iconURL,
                title: guideTicket.title,
                description: guideTicket.description,
                color: guideTicket.color,
                image: guideTicket.image.url,
                thumbnail: guideTicket.thumbnail.url,
                footerText: guideTicket.footer.text,
                footerIcon: guideTicket.footer.iconURL,
                buttonColor: createTicket.style
              });
              await messageComponent.edit({ components: [button6] });
              await interaction.reply({ content: 'Successfully Saved this Ticket Embed.', ephemeral: true });
            } else if (interaction.customId === 'abort_ticket') {
              const abortTicket = new MessageEmbed()
                .setTitle('Embed Creation Aborted')
                .setColor('#ff0000')
                .setDescription('The embed creation process has been aborted.');

              await interaction.update({ embeds: [abortTicket], components: [] });
            }
          }
        });
        break;

      case 'edit panel':

        const tAuthorText = (await client.db16.get(`${message.guild.id}_ticket_embed.authorText`)).toString();
        const tAuthorIcon = (await client.db16.get(`${message.guild.id}_ticket_embed.authorIcon`)).toString();
        const tTitle = (await client.db16.get(`${message.guild.id}_ticket_embed.title`)).toString();
        const tDescription = (await client.db16.get(`${message.guild.id}_ticket_embed.description`)).toString();
        const tColor = await client.db16.get(`${message.guild.id}_ticket_embed.color`);
        const tColorHex = Number(tColor).toString(16);
        const tThumbnail = (await client.db16.get(`${message.guild.id}_ticket_embed.thumbnail`));
        const tImage = (await client.db16.get(`${message.guild.id}_ticket_embed.image`));
        const tFooterText = (await client.db16.get(`${message.guild.id}_ticket_embed.footerText`)).toString();
        const tFooterIcon = (await client.db16.get(`${message.guild.id}_ticket_embed.footerIcon`)).toString();

        const editTicket = new MessageEmbed()
          .setAuthor(tAuthorText, tAuthorIcon, null)
          .setColor(`#${tColorHex.padStart(6, '0')}`)
          .setTitle(tTitle)
          .setDescription(tDescription)
          .setThumbnail(tThumbnail)
          .setImage(tImage)
          .setFooter(tFooterText, tFooterIcon);

        const editComponent = await message.channel.send({ embeds: [editTicket], components: [button1] });

        const editCollector = editComponent.createMessageComponentCollector({
          filter: (interaction) => interaction.user.id === message.author.id,
          time: 400000,
          idle: 400000 / 2,
        });

        editCollector.on('collect', async (interaction) => {
          if (interaction.isButton()) {
            if (interaction.customId === 'body_ticket') {
              await interaction.update({ components: [button2, button3, button4] });
            } else if (interaction.customId === 'misc_ticket') {
              await interaction.update({ components: [button5] })
            } else if (interaction.customId === 'title_ticket') {
              await interaction.reply({ content: `Please provide a Title for Ticket Embed below maximum character limit is 250`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const titleTicket = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();
                editTicket.setTitle(titleTicket);
                editComponent.edit({ embeds: [editTicket] });
              });
            } else if (interaction.customId === 'description_ticket') {
              await interaction.reply({ content: `Please provide a description for Ticket Embed below maximum character limit is 2048`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 300000
              });

              messageCollector.on('collect', async collectedMessage => {
                const titleDescription = collectedMessage.content.slice(0, 2048);
                collectedMessage.delete();
                editTicket.setDescription(titleDescription);
                editComponent.edit({ embeds: [editTicket] });
              });
            } else if (interaction.customId === 'color_ticket') {
              await interaction.reply({ content: `Please provide a Color for Ticket Embed below and it should be hex code (#000000)`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const colorInput = collectedMessage.content;
                collectedMessage.delete();

                const colorRegex = /^#([0-9A-Fa-f]{6})$/;
                if (!colorRegex.test(colorInput)) {
                  return message.channel.send("Invalid hex color code. Please use a format like '#000000'.");
                }

                const hexColor = colorInput.toUpperCase();
                editTicket.setColor(hexColor);
                editComponent.edit({ embeds: [editTicket] });
              });
            } else if (interaction.customId === 'author_text_ticket') {
              await interaction.reply({ content: `Please provide an Author for the Ticket Embed below. The maximum character limit is 250.`, ephemeral: true });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              let authorName = '';
              const authorIcon = editTicket.author ? editTicket.author.iconURL : null;

              messageCollector.on('collect', async (collectedMessage) => {
                authorName = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();

                if (!editTicket.author) {
                  editTicket.setAuthor(authorName, authorIcon, null);
                } else {
                  editTicket.setAuthor(authorName, editTicket.author.iconURL, editTicket.author.url);
                }

                editComponent.edit({ embeds: [editTicket] });
              });
            } else if (interaction.customId === 'author_icon_ticket') {
              await interaction.reply({
                content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif) for the author icon, or type 'none' to remove the image.`,
                ephemeral: true,
              });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (editTicket.author && editTicket.author.iconURL !== null) {
                    editTicket.setAuthor(editTicket.author.name, null, null);
                    await interaction.followUp({ content: 'Author icon removed successfully.', ephemeral: true });
                    editComponent.edit({ embeds: [editTicket] });
                  } else {
                    await interaction.followUp({ content: 'There is no author icon to remove.', ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({
                      content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the author icon.",
                      ephemeral: true,
                    });
                  }

                  collectedMessage.delete();

                  if (!editTicket.author) {
                    editTicket.setAuthor('', imageInput, null);
                  } else {
                    editTicket.setAuthor(editTicket.author.name, imageInput, editTicket.author.url);
                  }

                  await interaction.followUp({ content: 'Author icon added successfully.', ephemeral: true });
                  editComponent.edit({ embeds: [editTicket] });
                }
              });
            } else if (interaction.customId === 'footer_text_ticket') {
              await interaction.reply({ content: `Please provide a footer for the Ticket Embed below. The maximum character limit is 250`, ephemeral: true });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const footerText = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();

                if (!editTicket.footer) {
                  editTicket.setFooter(footerText, null);
                } else {
                  editTicket.setFooter(footerText, editTicket.footer.iconURL);
                }

                editComponent.edit({ embeds: [editTicket] });
              });
            } else if (interaction.customId === 'footer_icon_ticket') {
              await interaction.reply({
                content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif) for the footer icon, or type 'none' to remove the image.`,
                ephemeral: true,
              });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (editTicket.footer && editTicket.footer.iconURL !== null) {
                    editTicket.setFooter(editTicket.footer.text, null);
                    await interaction.followUp({ content: 'Footer icon removed successfully.', ephemeral: true });
                    editComponent.edit({ embeds: [editTicket] });
                  } else {
                    await interaction.followUp({ content: 'There is no footer icon to remove.', ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({
                      content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the footer icon.",
                      ephemeral: true,
                    });
                  }

                  collectedMessage.delete();

                  if (!editTicket.footer) {
                    editTicket.setFooter('', imageInput);
                  } else {
                    editTicket.setFooter(editTicket.footer.text, imageInput);
                  }

                  await interaction.followUp({ content: 'Footer icon added successfully.', ephemeral: true });
                  editComponent.edit({ embeds: [editTicket] });
                }
              });
            } else if (interaction.customId === 'image_ticket') {
              await interaction.reply({ content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the image.`, ephemeral: true });

              const messageCollectorFilter = msg => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (editTicket.image !== null) {
                    editTicket.setImage(null);
                    await interaction.followUp({ content: "Image removed successfully.", ephemeral: true });
                    editComponent.edit({ embeds: [editTicket] });
                  } else {
                    await interaction.followUp({ content: "There is no image to remove.", ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({ content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the image.", ephemeral: true });
                  }

                  collectedMessage.delete();
                  editTicket.setImage(imageInput);
                  isImageSet = true;
                  await interaction.followUp({ content: "Thumbnail added successfully.", ephemeral: true });
                  editComponent.edit({ embeds: [editTicket] });
                }
              });
            } else if (interaction.customId === 'thumbnail_ticket') {
              await interaction.reply({ content: `Please provide a valid thumbnail image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the thumbnail.`, ephemeral: true });

              const messageCollectorFilter = msg => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const thumbnailInput = collectedMessage.content;

                if (thumbnailInput.toLowerCase() === 'none') {
                  if (editTicket.thumbnail) {
                    editTicket.setThumbnail(null);
                    await interaction.followUp({ content: "Thumbnail removed successfully.", ephemeral: true });
                    editComponent.edit({ embeds: [editTicket] });
                  } else {
                    await interaction.followUp({ content: "There is no thumbnail to remove.", ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(thumbnailInput)) {
                    return interaction.followUp({ content: "Invalid image URL. Please provide a valid thumbnail image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the thumbnail.", ephemeral: true });
                  }

                  collectedMessage.delete();
                  editTicket.setThumbnail(thumbnailInput);
                  await interaction.followUp({ content: "Thumbnail added successfully.", ephemeral: true });
                  editComponent.edit({ embeds: [editTicket] });
                }
              });
            } else if (interaction.customId === 'default_ticket') {
              editTicket.setColor(client.color);
              editTicket.setTitle('');
              editTicket.setDescription('Default Ticket Embed Description');
              editTicket.setAuthor('', null, null);
              editTicket.setFooter('', null);
              editTicket.setThumbnail(null);
              editTicket.setImage(null);
              createTicket.setStyle(2);
              editComponent.edit({ embeds: [editTicket], components: [button1] });
              await interaction.reply({ content: 'Embed has been reset to the default state.', ephemeral: true });
            } else if (interaction.customId === 'preview_ticket') {
              await interaction.reply({ embeds: [editTicket], ephemeral: true });
            } else if (interaction.customId === 'back_ticket') {
              await interaction.update({ components: [button1] })
            } else if (interaction.customId === 'style_ticket') {

              const blue = new MessageButton()
                .setCustomId('style_selected_blue')
                .setLabel('Blue')
                .setStyle('PRIMARY');

              const grey = new MessageButton()
                .setCustomId('style_selected_grey')
                .setLabel('Grey')
                .setStyle('SECONDARY');

              const green = new MessageButton()
                .setCustomId('style_selected_green')
                .setLabel('Green')
                .setStyle('SUCCESS');

              const red = new MessageButton()
                .setCustomId('style_selected_red')
                .setLabel('Red')
                .setStyle('DANGER');

              const type = new MessageActionRow().addComponents(blue, grey, green, red)

              editComponent.edit({ components: [type] });
              await interaction.reply({ content: 'Please choose a style for the "Create Ticket" button (blue, grey, green, red).', ephemeral: true });
            } else if (interaction.customId === 'style_selected_blue') {
              createTicket.setStyle(1);
              await editComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Blue.', ephemeral: true });
            } else if (interaction.customId === 'style_selected_grey') {
              createTicket.setStyle(2);
              await editComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Grey.', ephemeral: true });
            } else if (interaction.customId === 'style_selected_green') {
              createTicket.setStyle(3);
              await editComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Green.', ephemeral: true });
            } else if (interaction.customId === 'style_selected_red') {
              createTicket.setStyle(4);
              await editComponent.edit({ components: [button5] });
              await interaction.reply({ content: 'Button style set to Red.', ephemeral: true });
            } else if (interaction.customId === 'save_ticket') {
              await client.db16.set(`${message.guild.id}_ticket_embed`, {
                authorText: editTicket.author.name,
                authorIcon: editTicket.author.iconURL,
                title: editTicket.title,
                description: editTicket.description,
                color: editTicket.color,
                image: editTicket.image.url,
                thumbnail: editTicket.thumbnail.url,
                footerText: editTicket.footer.text,
                footerIcon: editTicket.footer.iconURL,
                buttonColor: createTicket.style
              });
              await editComponent.edit({ components: [button6] });
              await interaction.reply({ content: 'Successfully Saved this Ticket Embed.', ephemeral: true });
            } else if (interaction.customId === 'abort_ticket') {
              const abortTicket = new MessageEmbed()
                .setTitle('Embed Creation Aborted')
                .setColor(client.error)
                .setDescription('The embed creation process has been aborted.');

              await interaction.update({ embeds: [abortTicket], components: [] });
            }
          }
        });
        break;

      case 'edit panel':

        const messageTicket = new MessageEmbed()
          .setColor(client.color)
          .setTitle('')
          .setAuthor('', null, null)
          .setFooter('', null)
          .setThumbnail(null)
          .setImage(null)
          .setDescription('Default Ticket Message Embed Description');

        const ticketMessageComponent = await message.channel.send({ embeds: [messageTicket], components: [button1] });

        const collector2 = ticketMessageComponent.createticketMessageComponentCollector({
          filter: (interaction) => interaction.user.id === message.author.id,
          time: 400000,
          idle: 400000 / 2,
        });

        collector2.on('collect', async (interaction) => {
          if (interaction.isButton()) {
            if (interaction.customId === 'body_ticket') {
              await interaction.update({ components: [button2, button3, button4] });
            } else if (interaction.customId === 'misc_ticket') {
              await interaction.update({ components: [button5] })
            } else if (interaction.customId === 'title_ticket') {
              await interaction.reply({ content: `Please provide a Title for Ticket Message Embed below maximum character limit is 250`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const titleTicket = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();
                messageTicket.setTitle(titleTicket);
                ticketMessageComponent.edit({ embeds: [messageTicket] });
              });
            } else if (interaction.customId === 'description_ticket') {
              await interaction.reply({ content: `Please provide a description for Ticket Message Embed below maximum character limit is 2048`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 300000
              });

              messageCollector.on('collect', async collectedMessage => {
                const titleDescription = collectedMessage.content.slice(0, 2048);
                collectedMessage.delete();
                messageTicket.setDescription(titleDescription);
                ticketMessageComponent.edit({ embeds: [messageTicket] });
              });
            } else if (interaction.customId === 'color_ticket') {
              await interaction.reply({ content: `Please provide a Color for Ticket Message Embed below and it should be hex code (#000000)`, ephemeral: true })
              const messageCollectorFilter = msg => msg.author.id === message.author.id;
              const messageCollector = message.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const colorInput = collectedMessage.content;
                collectedMessage.delete();

                const colorRegex = /^#([0-9A-Fa-f]{6})$/;
                if (!colorRegex.test(colorInput)) {
                  return message.channel.send("Invalid hex color code. Please use a format like '#000000'.");
                }

                const hexColor = colorInput.toUpperCase();
                messageTicket.setColor(hexColor);
                ticketMessageComponent.edit({ embeds: [messageTicket] });
              });
            } else if (interaction.customId === 'author_text_ticket') {
              await interaction.reply({ content: `Please provide an Author for the Ticket Message Embed below. The maximum character limit is 250.`, ephemeral: true });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              let authorName = '';
              const authorIcon = messageTicket.author ? messageTicket.author.iconURL : null;

              messageCollector.on('collect', async (collectedMessage) => {
                authorName = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();

                if (!messageTicket.author) {
                  messageTicket.setAuthor(authorName, authorIcon, null);
                } else {
                  messageTicket.setAuthor(authorName, messageTicket.author.iconURL, messageTicket.author.url);
                }

                ticketMessageComponent.edit({ embeds: [messageTicket] });
              });
            } else if (interaction.customId === 'author_icon_ticket') {
              await interaction.reply({
                content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif) for the author icon, or type 'none' to remove the image.`,
                ephemeral: true,
              });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (messageTicket.author && messageTicket.author.iconURL !== null) {
                    messageTicket.setAuthor(messageTicket.author.name, null, null);
                    await interaction.followUp({ content: 'Author icon removed successfully.', ephemeral: true });
                    ticketMessageComponent.edit({ embeds: [messageTicket] });
                  } else {
                    await interaction.followUp({ content: 'There is no author icon to remove.', ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({
                      content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the author icon.",
                      ephemeral: true,
                    });
                  }

                  collectedMessage.delete();

                  if (!messageTicket.author) {
                    messageTicket.setAuthor('', imageInput, null);
                  } else {
                    messageTicket.setAuthor(messageTicket.author.name, imageInput, messageTicket.author.url);
                  }

                  await interaction.followUp({ content: 'Author icon added successfully.', ephemeral: true });
                  ticketMessageComponent.edit({ embeds: [messageTicket] });
                }
              });
            } else if (interaction.customId === 'footer_text_ticket') {
              await interaction.reply({ content: `Please provide a footer for the Ticket Message Embed below. The maximum character limit is 250`, ephemeral: true });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const footerText = collectedMessage.content.slice(0, 250);
                collectedMessage.delete();

                if (!messageTicket.footer) {
                  messageTicket.setFooter(footerText, null);
                } else {
                  messageTicket.setFooter(footerText, messageTicket.footer.iconURL);
                }

                ticketMessageComponent.edit({ embeds: [messageTicket] });
              });
            } else if (interaction.customId === 'footer_icon_ticket') {
              await interaction.reply({
                content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif) for the footer icon, or type 'none' to remove the image.`,
                ephemeral: true,
              });

              const messageCollectorFilter = (msg) => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000,
              });

              messageCollector.on('collect', async (collectedMessage) => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (messageTicket.footer && messageTicket.footer.iconURL !== null) {
                    messageTicket.setFooter(messageTicket.footer.text, null);
                    await interaction.followUp({ content: 'Footer icon removed successfully.', ephemeral: true });
                    ticketMessageComponent.edit({ embeds: [messageTicket] });
                  } else {
                    await interaction.followUp({ content: 'There is no footer icon to remove.', ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({
                      content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the footer icon.",
                      ephemeral: true,
                    });
                  }

                  collectedMessage.delete();

                  if (!messageTicket.footer) {
                    messageTicket.setFooter('', imageInput);
                  } else {
                    messageTicket.setFooter(messageTicket.footer.text, imageInput);
                  }

                  await interaction.followUp({ content: 'Footer icon added successfully.', ephemeral: true });
                  ticketMessageComponent.edit({ embeds: [messageTicket] });
                }
              });
            } else if (interaction.customId === 'image_ticket') {
              await interaction.reply({ content: `Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the image.`, ephemeral: true });

              const messageCollectorFilter = msg => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const imageInput = collectedMessage.content;

                if (imageInput.toLowerCase() === 'none') {
                  if (messageTicket.image !== null) {
                    messageTicket.setImage(null);
                    await interaction.followUp({ content: "Image removed successfully.", ephemeral: true });
                    ticketMessageComponent.edit({ embeds: [messageTicket] });
                  } else {
                    await interaction.followUp({ content: "There is no image to remove.", ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(imageInput)) {
                    return interaction.followUp({ content: "Invalid image URL. Please provide a valid image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the image.", ephemeral: true });
                  }

                  collectedMessage.delete();
                  messageTicket.setImage(imageInput);
                  isImageSet = true;
                  await interaction.followUp({ content: "Thumbnail added successfully.", ephemeral: true });
                  ticketMessageComponent.edit({ embeds: [messageTicket] });
                }
              });
            } else if (interaction.customId === 'thumbnail_ticket') {
              await interaction.reply({ content: `Please provide a valid thumbnail image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the thumbnail.`, ephemeral: true });

              const messageCollectorFilter = msg => msg.author.id === interaction.user.id;
              const messageCollector = interaction.channel.createMessageCollector({
                filter: messageCollectorFilter,
                max: 1,
                time: 60000
              });

              messageCollector.on('collect', async collectedMessage => {
                const thumbnailInput = collectedMessage.content;

                if (thumbnailInput.toLowerCase() === 'none') {
                  if (messageTicket.thumbnail) {
                    messageTicket.setThumbnail(null);
                    await interaction.followUp({ content: "Thumbnail removed successfully.", ephemeral: true });
                    ticketMessageComponent.edit({ embeds: [messageTicket] });
                  } else {
                    await interaction.followUp({ content: "There is no thumbnail to remove.", ephemeral: true });
                  }
                } else {
                  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
                  if (!imageRegex.test(thumbnailInput)) {
                    return interaction.followUp({ content: "Invalid image URL. Please provide a valid thumbnail image URL (ending with .jpg, .jpeg, .png, or .gif), or type 'none' to remove the thumbnail.", ephemeral: true });
                  }

                  collectedMessage.delete();
                  messageTicket.setThumbnail(thumbnailInput);
                  await interaction.followUp({ content: "Thumbnail added successfully.", ephemeral: true });
                  ticketMessageComponent.edit({ embeds: [messageTicket] });
                }
              });
            } else if (interaction.customId === 'default_ticket') {
              messageTicket.setColor(client.color);
              messageTicket.setTitle('');
              messageTicket.setDescription('Default Ticket Message Embed Description');
              messageTicket.setAuthor('', null, null);
              messageTicket.setFooter('', null);
              messageTicket.setThumbnail(null);
              messageTicket.setImage(null);
              createTicket.setStyle(2);
              ticketMessageComponent.edit({ embeds: [messageTicket], components: [button1] });
              await interaction.reply({ content: 'Embed has been reset to the default state.', ephemeral: true });
            } else if (interaction.customId === 'preview_ticket') {
              await interaction.reply({ embeds: [messageTicket], ephemeral: true });
            } else if (interaction.customId === 'back_ticket') {
              await interaction.update({ components: [button1] })
            } else if (interaction.customId === 'save_ticket') {
              await client.db16.set(`${message.guild.id}_ticket_message`, {
                messageText: ticketMessageComponent.content,
                authorText: messageTicket.author.name,
                authorIcon: messageTicket.author.iconURL,
                title: messageTicket.title,
                description: messageTicket.description,
                color: messageTicket.color,
                image: messageTicket.image.url,
                thumbnail: messageTicket.thumbnail.url,
                footerText: messageTicket.footer.text,
                footerIcon: messageTicket.footer.iconURL,
                buttonColor: createTicket.style
              });
              await ticketMessageComponent.edit({ components: [button6] });
              await interaction.reply({ content: 'Successfully Saved this Ticket Message Embed.', ephemeral: true });
            } else if (interaction.customId === 'abort_ticket') {
              const abortTicket = new MessageEmbed()
                .setTitle('Embed Creation Aborted')
                .setColor('#ff0000')
                .setDescription('The embed creation process has been aborted.');

              await interaction.update({ embeds: [abortTicket], components: [] });
            }
          }
        });
        break;

      case 'send panel':
        break;

      default:
        break;
    }
  }
};
