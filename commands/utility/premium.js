const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const { PremiumAccess } = require('../../owner.json');
const Settings = require('../../settings.js');
const emoji = require('../../emoji.js');
const owner = Settings.bot.credits.developerId;
const voucher_codes = require("voucher-code-generator");

module.exports = {
  name: 'premium',
  run: async (client, message, args) => {
    const arypton = await client.users.fetch(owner);
    let prefix = await client.db8.get(`${message.guild.id}_prefix`) || Settings.bot.info.prefix;
    const user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.author;
    const ID = user.id

    const planOptions = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('planOption')
        .setPlaceholder(`Select a ${client.user.username} Premium Plan...`)
        .addOptions([
          {
            label: 'Trial (7d) - ₹29',
            value: 'weekly',
            description: 'Duration: 7 days'
          },
          {
            label: 'Basic (28d) - ₹79',
            value: 'monthly',
            description: 'Duration: 28 days'
          },
          {
            label: 'Professional (3m) - ₹199',
            value: 'monthlyx3',
            description: 'Duration: 84 days'
          },
          {
            label: 'Enterprise (1y) - ₹999',
            value: 'yearly',
            description: 'Duration: 336 days'
          },
          {
            label: 'Godlike (69y) - ₹4999',
            value: 'lifetime',
            description: 'Duration: 69 years'
          },
        ])
    )

    const data = await client.db12.get(`premium`);
    if (!data) {
      await client.db12.set(`premium`, { premiumServers: [] });
      return message.channel.send({ content: `Please use this command again.` });
    }

    const guide = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .addField(`${emoji.util.arrow} \`premium\``, `Shows the guide embed for the module .`)
      .addField(`${emoji.util.arrow} \`premium redeem\``, `Redeem premium code .`)
      .addField(`${emoji.util.arrow} \`premium status\``, `Check the premium status of the server.`)
      .addField(`${emoji.util.arrow} \`premium purchase\``, `Purchase the Premium Codes for your server.`)
      .addField(`${emoji.util.arrow} \`premium features\``, `See the Premium Features for your server.`)
      .setFooter(`Made by ${arypton.username} with 💞`, arypton.displayAvatarURL({ dynamic: true }));

    const subcommand = args[0];

    switch (subcommand) {
      case undefined:
        return message.channel.send({ embeds: [guide] });
      case 'gencode':
        let plan;
        let planSelected;
        let time;
        let bill;

        if (!PremiumAccess.includes(message.author.id)) {
          return message.channel.send({ content: `Not for you silly ;-;.` });
        }

        let msg = await message.channel.send({ content: `Please select the ${client.user.username} Premium plan, you want to opt:`, components: [planOptions] });

        const collector = await msg.createMessageComponentCollector({
          filter: (interaction) => {
            if (message.author.id === interaction.user.id) return true;
            else {
              return interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true })
            }
          },
          time: 200000,
          idle: 300000 / 2
        });

        collector.on('collect', async (interaction) => {
          if (interaction.isSelectMenu()) {
            for (const value of interaction.values) {
              if (value === `weekly`) {
                time = Date.now() + 86400000 * 7;
                planSelected = 'Trial (7d)';
                plan = 'trial'
                bill = '₹29';
                const codePremium = voucher_codes.generate({
                  postfix: "-resist",
                  pattern: "####-####-####-####-####-####",
                  charset: "alphanumeric"
                });
                const code = codePremium.toString().toUpperCase();

                const billReceipt = new MessageEmbed()
                  .setColor(client.color)
                  .setTitle(`Premium Code Purchase Receipt`)
                  .addField(`Customer`, `<@${ID}>`)
                  .addField(`Plan`, planSelected)
                  .addField(`Code`, `\`\`\`js\n${code}\`\`\``)
                  .addField(`Expire At`, `<t:${Math.floor(time / 1000)}:F>`)
                  .addField(`Bill`, `${bill}`)
                  .setFooter(`To redeem, use ${prefix}premium redeem <code>`, client.user.displayAvatarURL());

                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await msg.edit({ content: `This redeem code will be usable till <t:${Math.floor(time / 1000)}:F>`, components: [planOptions] });
                await interaction.reply({ embeds: [billReceipt] });
                await client.db12.set(`${code}`, {
                  plan: plan,
                  codeExpiresAt: time,
                  active: true,
                  redeemedAt: null
                });
              } else if (value === `monthly`) {
                time = Date.now() + 86400000 * 28;
                planSelected = 'Basic (28d)';
                plan = 'monthly';
                bill = '₹79';
                const codePremium = voucher_codes.generate({
                  postfix: "-resist",
                  pattern: "####-####-####-####-####-####",
                  charset: "alphanumeric"
                });
                const code = codePremium.toString().toUpperCase();

                const billReceipt = new MessageEmbed()
                  .setColor(client.color)
                  .setTitle(`Premium Code Purchase Receipt`)
                  .addField(`Customer`, `<@${ID}>`)
                  .addField(`Plan`, planSelected)
                  .addField(`Code`, `\`\`\`js\n${code}\`\`\``)
                  .addField(`Expire At`, `<t:${Math.floor(time / 1000)}:F>`)
                  .addField(`Bill`, `${bill}`)
                  .setFooter(`To redeem, use ${prefix}premium redeem <code>`, client.user.displayAvatarURL());

                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await msg.edit({ content: `This redeem code will be usable till <t:${Math.floor(time / 1000)}:F>`, components: [planOptions] });
                await interaction.reply({ embeds: [billReceipt] });
                await client.db12.set(`${code}`, {
                  plan: plan,
                  codeExpiresAt: time,
                  active: true,
                  redeemedAt: null
                });
              } else if (value === `monthlyx3`) {
                time = Date.now() + 86400000 * 84;
                planSelected = 'Professional (84d)';
                plan = 'monthlyx3';
                bill = '₹199';
                const codePremium = voucher_codes.generate({
                  postfix: "-resist",
                  pattern: "####-####-####-####-####-####",
                  charset: "alphanumeric"
                });
                const code = codePremium.toString().toUpperCase();

                const billReceipt = new MessageEmbed()
                  .setColor(client.color)
                  .setTitle(`Premium Code Purchase Receipt`)
                  .addField(`Customer`, `<@${ID}>`)
                  .addField(`Plan`, planSelected)
                  .addField(`Code`, `\`\`\`js\n${code}\`\`\``)
                  .addField(`Expire At`, `<t:${Math.floor(time / 1000)}:F>`)
                  .addField(`Bill`, `${bill}`)
                  .setFooter(`To redeem, use ${prefix}premium redeem <code>`, client.user.displayAvatarURL());

                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await msg.edit({ content: `This redeem code will be usable till <t:${Math.floor(time / 1000)}:F>`, components: [planOptions] });
                await interaction.reply({ embeds: [billReceipt] });
                await client.db12.set(`${code}`, {
                  plan: plan,
                  codeExpiresAt: time,
                  active: true,
                  redeemedAt: null
                });
              } else if (value === `yearly`) {
                time = Date.now() + 86400000 * 336;
                planSelected = 'Enterprise (336d)';
                plan = 'yearly';
                bill = '₹999';
                const codePremium = voucher_codes.generate({
                  postfix: "-resist",
                  pattern: "####-####-####-####-####-####",
                  charset: "alphanumeric"
                });
                const code = codePremium.toString().toUpperCase();

                const billReceipt = new MessageEmbed()
                  .setColor(client.color)
                  .setTitle(`Premium Code Purchase Receipt`)
                  .addField(`Customer`, `<@${ID}>`)
                  .addField(`Plan`, planSelected)
                  .addField(`Code`, `\`\`\`js\n${code}\`\`\``)
                  .addField(`Expire At`, `<t:${Math.floor(time / 1000)}:F>`)
                  .addField(`Bill`, `${bill}`)
                  .setFooter(`To redeem, use ${prefix}premium redeem <code>`, client.user.displayAvatarURL());

                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await msg.edit({ content: `This redeem code will be usable till <t:${Math.floor(time / 1000)}:F>`, components: [planOptions] });
                await interaction.reply({ embeds: [billReceipt] });
                await client.db12.set(`${code}`, {
                  plan: plan,
                  codeExpiresAt: time,
                  active: true,
                  redeemedAt: null
                });
              } else if (value === `lifetime`) {
                time = Date.now() + 86400000 * 336 * 69;
                planSelected = 'Godlike (69y)';
                plan = 'lifetime'
                bill = '₹4999';
                const codePremium = voucher_codes.generate({
                  postfix: "-resist",
                  pattern: "####-####-####-####-####-####",
                  charset: "alphanumeric"
                });
                const code = codePremium.toString().toUpperCase();

                const billReceipt = new MessageEmbed()
                  .setColor(client.color)
                  .setTitle(`Premium Code Purchase Receipt`)
                  .addField(`Customer`, `<@${ID}>`)
                  .addField(`Plan`, planSelected)
                  .addField(`Code`, `\`\`\`js\n${code}\`\`\``)
                  .addField(`Expire At`, `<t:${Math.floor(time / 1000)}:F>`)
                  .addField(`Bill`, `${bill}`)
                  .setFooter(`To redeem, use ${prefix}premium redeem <code>`, client.user.displayAvatarURL());

                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await msg.edit({ content: `This redeem code will be usable till <t:${Math.floor(time / 1000)}:F>`, components: [planOptions] });
                await interaction.reply({ embeds: [billReceipt] });
                await client.db12.set(`${code}`, {
                  plan: plan,
                  codeExpiresAt: time,
                  active: true,
                  redeemedAt: null
                });
              }
            }
          }
        });
        break;
      case 'redeem':
        const redeemCode = args.slice(1).join(" ");
        const data = await client.db12.get(`${redeemCode}`);
        const dataPremium = await client.db12.get(`${message.guild.id}_premium`);
        const premiumServer = await client.db12.get(`premium`);
        let alreadyPremium;
        let codePlan;
        let codeExpiry;
        let codeActive;
        let premiumActive;
        let samay;

        if (!data) {
          return message.channel.send({ content: `${emoji.util.cross} | The code you provided is invalid. Please try again by using a valid one!` });
        }

        codePlan = data.plan;
        codeExpiry = data.codeExpiresAt;
        codeActive = data.active;
        premiumActive = dataPremium.active;
        alreadyPremium = dataPremium.premiumExpiresAt;

        if (codeActive === false) {
          return message.channel.send({ content: `${emoji.util.cross} | This code is already being used. | Purchase a new one.` });
        }

        if (Date.now() >= codeExpiry) {
          return message.channel.send({ content: `${emoji.util.cross} | This code is expired.` });
        }

        if (codePlan === 'trial') {
          if (premiumActive === true) {
            samay = alreadyPremium + 86400000 * 7;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          } else {
            samay = Date.now() + 86400000 * 7;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          }
        } else if (codePlan === 'monthly') {
          if (premiumActive === true) {
            samay = alreadyPremium + 86400000 * 28;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          } else {
            samay = Date.now() + 86400000 * 28;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          }
        } else if (codePlan === 'monthlyx3') {
          if (premiumActive === true) {
            samay = alreadyPremium + 86400000 * 84;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          } else {
            samay = Date.now() + 86400000 * 84;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          }
        } else if (codePlan === 'yearly') {
          if (premiumActive === true) {
            samay = alreadyPremium + 86400000 * 336;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          } else {
            samay = Date.now() + 86400000 * 336;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          }
        } else if (codePlan === 'lifetime') {
          if (premiumActive === true) {
            samay = alreadyPremium + 86400000 * 336 * 69;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully extended premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          } else {
            samay = Date.now() + 86400000 * 336 * 69;
            await client.db12.set(`${redeemCode}`, {
              plan: codePlan,
              codeExpiresAt: codeExpiry,
              active: false,
              redeemedAt: Date.now()
            });
            await client.db12.set(`${message.guild.id}_premium`, {
              active: true,
              premiumExpiresAt: samay,
            });
            if (!premiumServer.premiumServers.includes(message.guild.id)) {
              await client.db12.push(`premium.premiumServers`, message.guild.id);
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            } else {
              message.channel.send({ content: `${emoji.util.tick} | Successfully activated premium for this server.\nPremium will expire on <t:${Math.floor(samay / 1000)}:F>` });
            }
          }
        }
        break;
      case 'purchase':
        let msg1 = await message.channel.send({ content: `Please select the ${client.user.username} Premium plan, you want to opt:`, components: [planOptions] });

        const collector1 = await msg1.createMessageComponentCollector({
          filter: (interaction) => {
            if (message.author.id === interaction.user.id) return true;
            else {
              return interaction.reply({ content: `${emoji.util.cross} | This Pagination is not for you.`, ephemeral: true })
            }
          },
          time: 200000,
          idle: 300000 / 2
        });

        collector1.on('collect', async (interaction) => {
          if (interaction.isSelectMenu()) {
            for (const value of interaction.values) {
              if (value === `weekly`) {
                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await interaction.reply({ content: `You are about to purchase **${client.user.username} Trial Premium Code**\n\n[*Click Me to Continue the Payment Process*](https://discord.gg/hdyZ9kRv93)`, ephemeral: true });
                await msg1.edit({ components: [planOptions] });
              } else if (value === `monthly`) {
                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await interaction.reply({ content: `You are about to purchase **${client.user.username} Monthly Premium Code**\n\n[*Click Me to Continue the Payment Process*](https://discord.gg/hdyZ9kRv93)`, ephemeral: true });
                await msg1.edit({ components: [planOptions] });
              } else if (value === `monthlyx3`) {
                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await interaction.reply({ content: `You are about to purchase **${client.user.username} Monthlyx3 Premium Code**\n\n[*Click Me to Continue the Payment Process*](https://discord.gg/hdyZ9kRv93)`, ephemeral: true });
                await msg1.edit({ components: [planOptions] });
              } else if (value === `yearly`) {
                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await interaction.reply({ content: `You are about to purchase **${client.user.username} Yearly Premium Code**\n\n[*Click Me to Continue the Payment Process*](https://discord.gg/hdyZ9kRv93)`, ephemeral: true });
                await msg1.edit({ components: [planOptions] });
              } else if (value === `lifetime`) {
                const lastButton = planOptions.components.find((component) => component.customId === "planOption");
                lastButton.setDisabled(true);
                await interaction.reply({ content: `You are about to purchase **${client.user.username} Lifetime Premium Code**\n\n[*Click Me to Continue the Payment Process*](https://discord.gg/hdyZ9kRv93)`, ephemeral: true });
                await msg1.edit({ components: [planOptions] });
              }
            }
          }
        });
        break;
      case 'status':
  const premiumData = await client.db12.get(`${message.guild.id}_premium`);

  if (!premiumData || premiumData.active === false) {
    const noPremium = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .addField('Server', '> Activated: No!')
      .addField('Premium Features', `> Antinuke Prune: ${emoji.util.cross}
> Antinuke Autorecovery: ${emoji.util.cross}
> Antinuke Whitelist Limit 100: ${emoji.util.cross}
> Autorole Humans Limit 10: ${emoji.util.cross}
> Autorole Bots Limit 10: ${emoji.util.cross}
> Extra Owner Limit 100: ${emoji.util.cross}
> Extra Admin Limit 100: ${emoji.util.cross}
> Ignore Channel Limit 100: ${emoji.util.cross}
> Ignore Bypass Limit 100: ${emoji.util.cross}
> Nightmode Role Limit 100: ${emoji.util.cross}
> Nightmode Bypass Limit 100: ${emoji.util.cross}
> Media Channel Limit 100: ${emoji.util.cross}`, false)
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));

    message.channel.send({ embeds: [noPremium] });
  } else {
    const ending = premiumData.premiumExpiresAt;
    const yesPremium = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .addField('Server', `> Activated: Yes!\n> Ending: <t:${Math.floor(ending / 1000)}:F>`, false)
      .addField('Premium Features', `> Antinuke Prune: ${emoji.util.tick}
> Antinuke Autorecovery: ${emoji.util.tick}
> Antinuke Whitelist Limit 100: ${emoji.util.tick}
> Autorole Humans Limit 10: ${emoji.util.tick}
> Autorole Bots Limit 10: ${emoji.util.tick}
> Extra Owner Limit 100: ${emoji.util.tick}
> Extra Admin Limit 100: ${emoji.util.tick}
> Ignore Channel Limit 100: ${emoji.util.tick}
> Ignore Bypass Limit 100: ${emoji.util.tick}
> Nightmode Role Limit 100: ${emoji.util.tick}
> Nightmode Bypass Limit 100: ${emoji.util.tick}
> Media Channel Limit 100: ${emoji.util.tick}`, false)
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));

    message.channel.send({ embeds: [yesPremium] });
  }
  break;
  case 'features':
  case 'feature':

  const premiumFeatures = new MessageEmbed()
    .setColor(client.color)
    .setTitle(`Premium Features for ${client.user.username}`)
    .setDescription(`With ${client.user.username} Premium, you get access to the following features:`)
    .addField('Antinuke Prune', `> ${emoji.util.tick} accessible`, true)
    .addField('Antinuke Autorecovery', `> ${emoji.util.tick} accessible`, true)
    .addField('Antinuke Whitelist Limit', `> ${emoji.util.tick} 100`, true)
    .addField('Autorole Humans Limit', `> ${emoji.util.tick} 10`, true)
    .addField('Autorole Bots Limit', `> ${emoji.util.tick} 10`, true)
    .addField('Extra Owner Limit', `> ${emoji.util.tick} 100`, true)
    .addField('Extra Admin Limit', `> ${emoji.util.tick} 100`, true)
    .addField('Ignore Channel Limit', `> ${emoji.util.tick} 100`, true)
    .addField('Ignore Bypass Limit', `> ${emoji.util.tick} 100`, true)
    .addField('Nightmode Role Limit', `> ${emoji.util.tick} 100`, true)
    .addField('Nightmode Bypass Limit', `> ${emoji.util.tick} 100`, true)
    .addField('Media Channel Limit', `> ${emoji.util.tick} 100`, true)
    .setFooter(`Enjoy the enhanced features with ${client.user.username} Premium!`, client.user.displayAvatarURL());

  await message.channel.send({ embeds: [premiumFeatures] });
  break;

      default:
        message.channel.send('Invalid command usage.');
        break;
    }
  }
};
