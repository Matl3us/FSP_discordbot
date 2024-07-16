const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue_add')
		.setDescription('Add the team to the inspection queue.')
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
        const chosenOption = interaction.options.getString("type");
        console.log(chosenOption);
        const teamRoles = ["Team1","Team2","Team3","Team4","Team5","Team6","Team7","Team8","Team9","Team10","Team11","Team12","Team13","Team14","Team15","Team16","Team17","Team18"]
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
		await interaction.reply(`Team with role <@&${role.id}> is added to the queue!`);
	},
};