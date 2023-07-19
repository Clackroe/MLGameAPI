import { PrismaClient, match, model, user, team } from "@prisma/client";
// import e from "express";

const prisma = new PrismaClient();

// Function to create a match
export async function createMatch(data: match) {
  try {
    const match = await prisma.match.create({ data });
    return match;
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error("Failed to create match.");
  }
}

// Function to get a match by ID
export async function getMatchById(matchId: string) {
  try {
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        team1: true,
        team2: true,
        modelAsTeam1: true,
        modelAsTeam2: true,
        winningModel: true,
        winningTeam: true,
      },
    });
    return match;
  } catch (error) {
    console.error("Error retrieving match:", error);
    throw new Error("Failed to retrieve match.");
  }
}

// Function to update a match
export async function updateMatch(matchId: string, data: match) {
  try {
    const match = await prisma.match.update({
      where: { id: matchId },
      data,
    });
    return match;
  } catch (error) {
    console.error("Error updating match:", error);
    throw new Error("Failed to update match.");
  }
}

// Function to delete a match
export async function deleteMatch(matchId: string) {
  try {
    const match = await prisma.match.delete({
      where: { id: matchId },
    });
    return match;
  } catch (error) {
    console.error("Error deleting match:", error);
    throw new Error("Failed to delete match.");
  }
}

// Function to create a model
export async function createModel(data: model) {
  try {
    const model = await prisma.model.create({ data });
    return model;
  } catch (error) {
    console.error("Error creating model:", error);
    throw new Error("Failed to create model.");
  }
}

// Function to get a model by ID
export async function getModelById(modelId: string) {
  try {
    const model = await prisma.model.findUnique({
      where: { id: modelId },
      include: {
        team: true,
        matchesAsTeam1: true,
        matchesAsTeam2: true,
        matchesAsWinningModel: true,
      },
    });
    return model;
  } catch (error) {
    console.error("Error retrieving model:", error);
    throw new Error("Failed to retrieve model.");
  }
}

// Function to update a model
export async function updateModel(modelId: string, data: model) {
  try {
    const model = await prisma.model.update({
      where: { id: modelId },
      data,
    });
    return model;
  } catch (error) {
    console.error("Error updating model:", error);
    throw new Error("Failed to update model.");
  }
}

// Function to delete a model
export async function deleteModel(modelId: string) {
  try {
    const model = await prisma.model.delete({
      where: { id: modelId },
    });
    return model;
  } catch (error) {
    console.error("Error deleting model:", error);
    throw new Error("Failed to delete model.");
  }
}

// Function to create a team
export async function createTeam(data: team) {
  try {
    const team = await prisma.team.create({ data });
    return team;
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to create team.");
  }
}

// Function to get a team by ID
export async function getTeamById(teamId: string) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        users: true,
        models: true,
        matchesAsTeam1: true,
        matchesAsTeam2: true,
        matchesAsWinningModel: true,
      },
    });
    return team;
  } catch (error) {
    console.error("Error retrieving team:", error);
    throw new Error("Failed to retrieve team.");
  }
}

// Function to update a team
export async function updateTeam(teamId: string, data: team) {
  try {
    const team = await prisma.team.update({
      where: { id: teamId },
      data,
    });
    return team;
  } catch (error) {
    console.error("Error updating team:", error);
    throw new Error("Failed to update team.");
  }
}

// Function to delete a team
export async function deleteTeam(teamId: string) {
  try {
    const team = await prisma.team.delete({
      where: { id: teamId },
    });
    return team;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Failed to delete team.");
  }
}

// Function to create a user
export async function createUser(data: user) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user.");
  }
}

// Function to get a user by ID
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        team: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new Error("Failed to retrieve user.");
  }
}

// Function to update a user
export async function updateUser(userId: string, data: user) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user.");
  }
}

// Function to delete a user
export async function deleteUser(userId: string) {
  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  }
}

export async function getAllTeams() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        users: true,
        models: true,
        matchesAsTeam1: true,
        matchesAsTeam2: true,
        matchesAsWinningModel: true,
      },
    });
    return teams;
  } catch (error) {
    console.error("Error retrieving teams:", error);
    throw new Error("Failed to retrieve teams.");
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        team: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Failed to retrieve users.");
  }
}

export async function getAllModels() {
  try {
    const models = await prisma.model.findMany({
      include: {
        team: true,
        matchesAsTeam1: true,
        matchesAsTeam2: true,
        matchesAsWinningModel: true,
      },
    });
    return models;
  } catch (error) {
    console.error("Error retrieving models:", error);
    throw new Error("Failed to retrieve models.");
  }
}

export async function getAllMatches() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        team1: true,
        team2: true,
        modelAsTeam1: true,
        modelAsTeam2: true,
        winningModel: true,
        winningTeam: true,
      },
    });
    return matches;
  } catch (error) {
    console.error("Error retrieving matches:", error);
    throw new Error("Failed to retrieve matches.");
  }
}

export async function getTeamByName(name: string) {
  try {
    const team = await prisma.team.findUnique({
      where: { name: name },
      include: {
        users: true,
        models: true,
        matchesAsTeam1: true,
        matchesAsTeam2: true,
        matchesAsWinningModel: true,
      },
    });
    return team;
  } catch (error) {
    console.error("Error retrieving team:", error);
    throw new Error("Failed to retrieve team.");
  }
}

export async function getUsersByTeamID(id: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        team_id: id,
      },
      include: {
        team: true,
      },
    });

    return users;
  } catch (error) {
    console.error("Error getting users", error);
    throw new Error("Failed to get users from team");
  }
}

export async function getModelsByTeamID(id: string) {
  try {
    const models = await prisma.model.findMany({
      where: {
        team_id: id,
      },
      include: {
        team: true,
        matchesAsTeam1: true,
        matchesAsTeam2: true,
        matchesAsWinningModel: true,
      },
    });

    return models;
  } catch (error) {
    console.error("Error getting models", error);
    throw new Error("Failed to get models from team");
  }
}

export async function getMatchesByTeamID(id: string) {
  try {
    const matches = await prisma.match.findMany({
      where: {
        team_1: id,
      },
      include: {
        team1: true,
        team2: true,
        modelAsTeam1: true,
        modelAsTeam2: true,
        winningModel: true,
        winningTeam: true,
      },
    });

    return matches;
  } catch (error) {
    console.error("Error getting matches", error);
    throw new Error("Failed to get matches from team");
  }
}

export async function getUserByDiscordId(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        discord_id: id,
      },
      include: {
        team: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user", error);
    throw new Error("Failed to get user from discord id");
  }
}

export async function getUserByEpicId(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        epic_id: id,
      },
      include: {
        team: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user", error);
    throw new Error("Failed to get user from epic id");
  }
}

export async function getMatchesByModelID(id: string) {
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ team_1_model: id }, { team_2_model: id }],
      },
      include: {
        team1: true,
        team2: true,
        modelAsTeam1: true,
        modelAsTeam2: true,
        winningModel: true,
        winningTeam: true,
      },
    });

    return matches;
  } catch (error) {
    console.error("Error getting matches", error);
    throw new Error("Failed to get matches from model");
  }
}

export async function getMatchesByTeamName(id: string) {
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ team_1: id }, { team_2: id }],
      },
      include: {
        team1: true,
        team2: true,
        modelAsTeam1: true,
        modelAsTeam2: true,
        winningModel: true,
        winningTeam: true,
      },
    });

    return matches;
  } catch (error) {
    console.error("Error getting matches", error);
    throw new Error("Failed to get matches from team");
  }
}
