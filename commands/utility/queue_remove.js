const { SlashCommandBuilder } = require('discord.js');
const TestQueue = require("../../data/test_queue")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue_remove')
		.setDescription('Remove the team from the inspection queue.'),
	async execute(interaction) {
        const role = TestQueue.removeFromQueue();
		if (!role) {
			await interaction.reply("There are no teams in queue!");
			return;
		}

		await interaction.reply("Removed team with role " + `<@&${role.id}>` + " from the queue!");
	},
};