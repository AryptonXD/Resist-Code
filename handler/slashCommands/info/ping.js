const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns bot ping.'),
	async execute(client, interaction) {
		interaction.reply({ content: `Pong! ${client.ws.ping.toFixed(2) / 5}ms`, ephemeral: true })
	}
};