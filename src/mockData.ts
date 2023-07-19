import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { v4 as uuidv4 } from "uuid";

export async function insertMockData() {
  console.log("Inserting mock data");

  const playerIds = [];
  const teamIds = [];

  // Create players and collect their UUIDs
  for (let i = 0; i < 15; i++) {
    const playerId = uuidv4(); // Generate a random UUID for the player
    playerIds.push(playerId);
    await prisma.user.create({
      data: {
        id: playerId,
        team_id: null, // Players are not associated with teams initially
        name: `User ${i}_Name`,
        epic_id: `EPIC_${i}`,
        discord_id: `DISCORD_${i}`,
      },
    });
  }

  // Create teams and associate players
  for (let i = 0; i < 5; i++) {
    const teamId = uuidv4(); // Generate a random UUID for the team
    teamIds.push(teamId);
    // const teamPlayerIds = playerIds.slice(i * 3, i * 3 + 3); // Get player UUIDs for this team
    await prisma.team.create({
      data: {
        id: teamId,
        name: `Team_${i}_Name`,
        //  players: {
        //    connect: teamPlayerIds.map((playerId) => ({ id: playerId })),
        //  },
      },
    });
  }

  // Update players with their associated teams
  for (let i = 0; i < 5; i++) {
    const teamPlayerIds = playerIds.slice(i * 3, i * 3 + 3); // Get player UUIDs for this team
    const teamId = teamIds[i]; // Get the UUID of the team
    await prisma.user.updateMany({
      where: {
        id: { in: teamPlayerIds },
      },
      data: {
        team_id: teamId, // Associate players with their respective team
      },
    });
  }

  for (let i = 0; i < 15; i++) {
    const modelId = uuidv4(); // Generate a random UUID for the model
    await prisma.model.create({
      data: {
        id: modelId,
        name: `Model ${i}_Name`,
        team_id: teamIds[i % 5], // Get the team UUID associated with this model's index
        url: `https://www.test.com/MODEL_${i}`,
      },
    });
  }

  await prisma.$disconnect();
}

export async function insertMatches() {
  await prisma.$connect();

  const teams = await prisma.team.findMany();

  for (let i = 0; i < 50; i++) {
    // generate two random numbers between 0 and aray length)
    const team1 = teams[Math.floor(Math.random() * teams.length)];
    const team2 = teams[Math.floor(Math.random() * teams.length)];
    const team1Models = await prisma.model.findMany();
    const team2Models = await prisma.model.findMany();

    let winningTeam;
    let winningModel;
    const team1Model =
      team1Models[Math.floor(Math.random() * team1Models.length)].id;
    const team2Model =
      team2Models[Math.floor(Math.random() * team2Models.length)].id;
    if (Math.random() > 0.5) {
      winningTeam = team1;
      winningModel = team1Model;
    } else {
      winningTeam = team2;
      winningModel = team2Model;
    }
    const matchId = uuidv4(); // Generate a random UUID for the match
    await prisma.match.create({
      data: {
        id: matchId,
        team_1: team1.id,
        team_2: team2.id,
        team_1_model: team1Model,
        team_2_model: team2Model,
        type: "Casual",
        timestamp: new Date(),
        team_1_score: Math.floor(Math.random() * 10),
        team_2_score: Math.floor(Math.random() * 10),
        winning_team_id: winningTeam.id,
        winning_model_id: winningModel,
      },
    });
  }

  await prisma.$disconnect();
}
