const { SlashCommandBuilder } = require("discord.js");
const prisma = require("../../prisma/prisma");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("request_charger")
    .setDescription("Add the team to the charger queue."),
  async execute(interaction) {
    const teamRoles = [
      "Team1",
      "Team2",
      "Team3",
      "Team4",
      "Team5",
      "Team6",
      "Team7",
      "Team8",
      "Team9",
      "Team10",
      "Team11",
      "Team12",
      "Team13",
      "Team14",
      "Team15",
      "Team16",
      "Team17",
      "Team18",
    ];
    const cache = interaction.member.roles.cache;
    const userRoles = cache
      .map((r) => r.name)
      .filter((r) => teamRoles.includes(r));

    if (userRoles.length < 1) {
      await interaction.reply("```No team role!```");
      return;
    }

    if (userRoles.length > 1) {
      await interaction.reply("```Too many team roles!```");
      return;
    }

    const role = interaction.member.roles.cache.find(
      (role) => role.name === userRoles[0]
    );
    
    const chargeExists = await prisma.chargingRequest.findFirst({
      where: {
        team_name: role.name,
      },
    });
    if (chargeExists) {
      await interaction.reply(`Team is already in queue!`);
      return;
    }

    await prisma.chargingRequest.create({
      data: {
        team_name: role.name,
      },
    });

    await interaction.reply(
      `Team with role <@&${role.id}> is added to the queue!`
    );
  },
};
