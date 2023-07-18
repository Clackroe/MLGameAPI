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

export async function getTeamIDFromUserName(name: string) {
  const user = await prisma.user.findUnique({
    where: {
      discord_id: name,
    } || {
      epic_id: name,
    },
  });

  return user.team_id;
}

export async function getUserFromID(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function getAllTeamIDs() {
  const teams = await prisma.team.findMany();
  const teamIDs: string[] = [];

  teams.forEach((team) => {
    teamIDs.push(team.id);
  });

  return teamIDs;
}

export async function getAllUserIDs() {
  const users = await prisma.user.findMany();
  const userIDs: string[] = [];

  users.forEach((user) => {
    userIDs.push(user.id);
  });

  return userIDs;
}

export async function getAllMatchIDs() {
  const matches = await prisma.match.findMany();
  const matchIDs: string[] = [];

  matches.forEach((match) => {
    matchIDs.push(match.id);
  });

  return matchIDs;
}

export async function getMatchFromID(id: string) {
  const match = await prisma.match.findUnique({
    where: {
      id,
    },
  });

  return match;
}

export async function getModelFromID(id: string) {
  const model = await prisma.model.findUnique({
    where: {
      id,
    },
  });

  return model;
}
