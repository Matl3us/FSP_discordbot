const { SlashCommandBuilder } = require('discord.js');
const TestQueue = require("../../data/test_queue")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue_add')
		.setDescription('Add the team to the inspection queue.'),
	async execute(interaction) {
        const teamRoles = ["Team 1", "Team 2","Team 3","Team 4","Team 5","Team 6","Team 7","Team 8","Team 9","Team 10","Team 11","Team 12" ]
        const cache = interaction.member.roles.cache;
        const userRoles = cache.map(r => r.name).filter(r => teamRoles.includes(r));

        if (userRoles.length < 1) {
            await interaction.reply("```No team role!```");
            return;
        }

        if (userRoles.length > 1) {
            await interaction.reply("```Too many team roles!```");
            return;
        }

        const role = interaction.member.roles.cache.find(role => role.name === userRoles[0]);
        TestQueue.addToQueue(role);
		await interaction.reply(`Team with role <@&${role.id}> is added to the queue!`);
	},
};