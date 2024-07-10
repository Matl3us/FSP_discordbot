const { SlashCommandBuilder } = require('discord.js');
const TestQueue = require("../../data/test_queue")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue_show')
		.setDescription('Show the list of teams from the inspection queue.'),
	async execute(interaction) {
        const message = TestQueue.getQueueString();
		await interaction.reply(message);
	},
};