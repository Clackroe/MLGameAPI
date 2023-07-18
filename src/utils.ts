import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getTeamFromName(teamName: string) {
  const team = await prisma.team.findUnique({
    where: {
      name: teamName,
    },
  });

  return team;
}

export async function getTeamFromID(teamID: string) {
  const team = await prisma.team.findUnique({
    where: {
      id: teamID,
    },
  });

  return team;
}

export async function getUsersFromTeamID(userID: string) {
  const users = await prisma.user.findMany({
    where: {
      team_id: userID,
    },
  });

  return users;
}

export async function getMatchesFromTeamID(teamID: string) {
  const matches = await prisma.match.findMany({
    where: {
      team_1: teamID,
    } || {
      team_2: teamID,
    },
  });

  return matches;
}

export async function getModelsFromTeamID(teamID: string) {
  const models = await prisma.model.findMany({
    where: {
      team_id: teamID,
    },
  });

  return models;
}
