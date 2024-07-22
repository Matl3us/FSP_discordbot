const { SlashCommandBuilder } = require("discord.js");
const prisma = require("../../prisma/prisma");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("show_queue")
    .setDescription("Show the list of teams from the inspection queue.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The inspection type")
        .setRequired(true)
        .addChoices(
          { name: "Mechanical inspection", value: "Mechanical" },
          { name: "LV/HV inspection", value: "LV/HV" },
          { name: "Accumulator inspection", value: "Accumulator" },
          { name: "Charger queue", value: "Charger" },
          { name: "All inspections", value: "all" }
        )
    ),
  async execute(interaction) {
    const chosenOption = interaction.options.getString("type");
    let message;
    let counter = 1;

    switch (chosenOption) {
      case "Mechanical":
        message = "Teams in mechanical inspection queue:\n";
        const mechQueue = await prisma.mechanicalRequest.findMany({});
        mechQueue.forEach((e) => {
          message += `${counter}) <@&${e.team_id}>\n`;
          counter++;
        });
        break;
      case "LV/HV":
        message = "Teams in LV/HV inspection queue:\n";
        const LV_HVQueue = await prisma.electricalRequest.findMany({});
        LV_HVQueue.forEach((e) => {
          message += `${counter}) <@&${e.team_id}>\n`;
          counter++;
        });
        break;
      case "Accumulator":
        message = "Teams in accumulator inspection queue:\n";
        const AccQueue = await prisma.accumulatorRequest.findMany({});
        AccQueue.forEach((e) => {
          message += `${counter}) <@&${e.team_id}>\n`;
          counter++;
        });
        break;
        case "Charger":
        message = "Teams in charger queue:\n";
        const ChargerQueue = await prisma.chargingRequest.findMany({});
        ChargerQueue.forEach((e) => {
          message += `${counter}) <@&${e.team_id}>\n`;
          counter++;
        });
        break;
      case "all":
        const allMech = await prisma.mechanicalRequest.findMany({});
        const allLV_HV = await prisma.electricalRequest.findMany({});
        const allAcc = await prisma.accumulatorRequest.findMany({});

        message = "Teams in mechanical inspection queue:\n";
        allMech.forEach((e) => {
          message += `${counter}) <@&${e.team_id}>\n`;
          counter++;
        });
        counter = 1;
        message += "\nTeams in LV/HV inspection queue:\n";
        allLV_HV.forEach((e) => {
          message += `${counter}) <@&${e.team_id}>\n`;
          counter++;
        });
        counter = 1;
        message += "\nTeams in accumulator inspection queue:\n";
        allAcc.forEach((e) => {
          message += `${counter}) <@&${e.team_id}>\n`;
          counter++;
        });

        break;
      default:
        await interaction.reply("Error occurred");
    }
    await interaction.reply(message);
  },
};
