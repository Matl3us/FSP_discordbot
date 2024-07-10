const { SlashCommandBuilder } = require('discord.js');
const TestQueue = require("../../data/test_queue")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rem_inspect')
		.setDescription('Remove the team from the inspection queue.'),
	async execute(interaction) {
        const role = TestQueue.removeFromQueue();
		await interaction.reply(`Removed team with role <@&${role.id}> from the queue!`);
	},
};