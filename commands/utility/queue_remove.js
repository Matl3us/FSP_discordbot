const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const prisma = require("../../prisma/prisma");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("queue_remove")
    .setDescription("Remove the team from the inspection queue.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The inspection type")
        .setRequired(true)
        .addChoices(
          { name: "Pre-inspection", value: "Pre-inspection" },
          { name: "Mechanical inspection", value: "Mechanical" },
          { name: "LV/HV inspection", value: "LV/HV" },
          { name: "Accumulator inspection", value: "Accumulator" },
          { name: "Charger queue", value: "Charger" }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const chosenOption = interaction.options.getString("type");
    let requests;
    let req;

    switch (chosenOption) {
      case "Pre-inspection":
        requests = await prisma.preInspection.findMany({
          orderBy: {
            timestamp: "asc",
          },
        });
        if (requests.length == 0) {
          await interaction.reply(
            "There are no teams in pre-inspection queue!"
          );
          return;
        }

        req = await prisma.preInspection.delete({
          where: {
            id: requests[0].id,
          },
        });
        break;
      case "Mechanical":
        requests = await prisma.mechanicalRequest.findMany({
          orderBy: {
            timestamp: "asc",
          },
        });
        if (requests.length == 0) {
          await interaction.reply(
            "There are no teams in mechanical inspection queue!"
          );
          return;
        }

        req = await prisma.mechanicalRequest.delete({
          where: {
            id: requests[0].id,
          },
        });
        break;
      case "LV/HV":
        requests = await prisma.electricalRequest.findMany({
          orderBy: {
            timestamp: "asc",
          },
        });
        if (requests.length == 0) {
          await interaction.reply(
            "There are no teams in LV/HV inspection queue!"
          );
          return;
        }

        req = await prisma.electricalRequest.delete({
          where: {
            id: requests[0].id,
          },
        });
        break;
      case "Accumulator":
        requests = await prisma.accumulatorRequest.findMany({
          orderBy: {
            timestamp: "asc",
          },
        });
        if (requests.length == 0) {
          await interaction.reply(
            "There are no teams in accumulator inspection queue!"
          );
          return;
        }

        req = await prisma.accumulatorRequest.delete({
          where: {
            id: requests[0].id,
          },
        });
        break;
      case "Charger":
        requests = await prisma.chargingRequest.findMany({
          orderBy: {
            timestamp: "asc",
          },
        });
        if (requests.length == 0) {
          await interaction.reply("There are no teams in charger queue!");
          return;
        }

        req = await prisma.chargingRequest.delete({
          where: {
            id: requests[0].id,
          },
        });
        break;
      default:
        await interaction.reply("Error occurred");
    }

    await interaction.reply(
      "Removed team " + `<@&${req.team_id}>` + " from the queue!"
    );
  },
};
