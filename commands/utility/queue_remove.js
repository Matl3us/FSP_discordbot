const { SlashCommandBuilder } = require('discord.js');
const TestQueue = require("../../data/test_queue")

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('queue_remove')
		.setDescription('Remove the team from the inspection queue.')
		.addStringOption(option =>
            option.setName('type')
                .setDescription('The inspection type')
                .setRequired(true)
                .addChoices(
                    { name: 'Mechanical', value: 'Mechanical' },
					{ name: 'Queue2', value: 'Queue2' },
                    { name: 'Queue3', value: 'Queue3' },
                )),
	async execute(interaction) {
        const role = TestQueue.removeFromQueue();
		if (!role) {
			await interaction.reply("There are no teams in queue!");
			return;
		}

		switch(chosenOption)
        {
            case "Mechanical":
                break;
            case "queue2":
                break;
            case "queue3":
                break;
            default:
                await interaction.reply('Error occurred');
        }

		await interaction.reply("Removed team with role " + `<@&${role.id}>` + " from the queue!");
	},
};