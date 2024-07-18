const { SlashCommandBuilder } = require('discord.js');
const prisma = require('../../prisma/prisma');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue_add')
		.setDescription('Add the team to the inspection queue.')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('The inspection type')
                .setRequired(true)
                .addChoices(
                    { name: 'Mechanical inspection', value: 'Mechanical' },
                    { name: 'LV/HV inspection', value: 'LV/HV' },
                    { name: 'Accumulator inspection', value: 'Accumulator' },
                )),
	async execute(interaction) {
        const chosenOption = interaction.options.getString("type");
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
                const mechExists = await prisma.mechanicalRequest.findFirst({
                    where: {
                        team_name: role.name
                    }
                })
                if (mechExists) {
                    await interaction.reply(`Team is already in queue!`);
                    return;
                }

                await prisma.mechanicalRequest.create({
                    data: {
                        team_name: role.name,
                    }
                })
                break;
            case "LV/HV":
                const electExists = await prisma.electricalRequest.findFirst({
                    where: {
                        team_name: role.name
                    }
                })
                if (electExists) {
                    await interaction.reply(`Team is already in queue!`);
                    return;
                }

                await prisma.electricalRequest.create({
                    data: {
                        team_name: role.name,
                    }
                })
                break;
            case "Accumulator":
                const accExists = await prisma.accumulatorRequest.findFirst({
                    where: {
                        team_name: role.name
                    }
                })
                if (accExists) {
                    await interaction.reply(`Team is already in queue!`);
                    return;
                }

                await prisma.accumulatorRequest.create({
                    data: {
                        team_name: role.name,
                    }
                })
                break;
            default:
                await interaction.reply('Error occurred');
        }
		await interaction.reply(`Team with role <@&${role.id}> is added to the queue!`);
	},
};