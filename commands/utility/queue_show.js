const { SlashCommandBuilder } = require('discord.js');
const TestQueue = require("../../data/test_queue")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue_show')
		.setDescription('Show the list of teams from the inspection queue.')
		.addStringOption(option =>
            option.setName('type')
                .setDescription('The inspection type')
                .setRequired(true)
                .addChoices(
                    { name: 'Mechanical', value: 'Mechanical' },
					{ name: 'Queue2', value: 'Queue2' },
                    { name: 'Queue3', value: 'Queue3' },
					{ name: 'all', value: 'all' },
                )),
	async execute(interaction) {
        const message = TestQueue.getQueueString();

		switch(chosenOption)
        {
            case "Mechanical":
                break;
            case "queue2":
                break;
            case "queue3":
                break;
			case "all":
				break;
            default:
                await interaction.reply('Error occurred');
        }
		await interaction.reply(message);
	},
};