const { SlashCommandBuilder } = require("discord.js");
const prisma = require("../../prisma/prisma");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("request_inspection")
    .setDescription("Add the team to the inspection queue.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The inspection type")
        .setRequired(true)
        .addChoices(
          { name: "Mechanical inspection", value: "Mechanical" },
          { name: "LV/HV inspection", value: "LV/HV" },
          { name: "Accumulator inspection", value: "Accumulator" }
        )
    ),
  async execute(interaction) {
    const chosenOption = interaction.options.getString("type");
    const teams = await prisma.team.findMany({});

    const cache = interaction.member.roles.cache.map((r) => r.name);

    const team = teams.filter((t) => cache.includes(t.team_name));

    if (team.length < 1) {
      await interaction.reply("```No team role!```");
      return;
    }

    if (team.length > 1) {
      await interaction.reply("```Too many team roles!```");
      return;
    }

    const role = interaction.member.roles.cache.find(
      (role) => role.name === team[0].team_name
    );

    switch (chosenOption) {
      case "Mechanical":
        const mechExists = await prisma.mechanicalRequest.findFirst({
          where: {
            team_name: role.name,
          },
        });
        if (mechExists) {
          await interaction.reply(`Team is already in queue!`);
          return;
        }

        await prisma.mechanicalRequest.create({
          data: {
            team_name: role.name,
            team_id: role.id,
          },
        });
        break;
      case "LV/HV":
        const electExists = await prisma.electricalRequest.findFirst({
          where: {
            team_name: role.name,
          },
        });
        if (electExists) {
          await interaction.reply(`Team is already in queue!`);
          return;
        }

        await prisma.electricalRequest.create({
          data: {
            team_name: role.name,
            team_id: role.id,
          },
        });
        break;
      case "Accumulator":
        const accExists = await prisma.accumulatorRequest.findFirst({
          where: {
            team_name: role.name,
          },
        });
        if (accExists) {
          await interaction.reply(`Team is already in queue!`);
          return;
        }

        await prisma.accumulatorRequest.create({
          data: {
            team_name: role.name,
            team_id: role.id,
          },
        });
        break;
      default:
        await interaction.reply("Error occurred");
    }
    await interaction.reply(`Team <@&${role.id}> is added to the queue!`);
    const channel = interaction.client.channels.cache.get(
      "1264965239686828052"
    );
    channel.send(`Team <@&${role.id}> is added to the ${chosenOption} queue! `);
  },
};
