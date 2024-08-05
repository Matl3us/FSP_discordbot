const { SlashCommandBuilder } = require("discord.js");
const prisma = require("../../prisma/prisma");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("request_pre-inspection")
    .setDescription("Add the team to the Pre-inspection queue."),
  async execute(interaction) {
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

    const inspectExists = await prisma.preInspection.findFirst({
      where: {
        team_name: role.name,
      },
    });
    if (inspectExists) {
      await interaction.reply(`Team is already in queue!`);
      return;
    }

    await prisma.preInspection.create({
      data: {
        team_name: role.name,
        team_id: role.id,
      },
    });

    await interaction.reply(
      `Team <@&${role.id}> is added to the Pre-inspection queue!`
    );
    const channel = interaction.client.channels.cache.get(
      "1264965239686828052"
    );
    channel.send(`Team <@&${role.id}> is added to the Pre-inspection queue! `);
  },
};
