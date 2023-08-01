import {
  PrismaClient,
  Team,
  User,
  /*TrainedMatch,*/ EquationMatch,
  Equation,
  /*Model,*/ Job /*VerificationToken*/,
} from "@prisma/client";
// import e from "express";

const prisma = new PrismaClient();

// -------------------------------- EQUATION MATCH --------------------------------
// Function to create a match
export async function upsertEquationMatch(data: EquationMatch) {
  try {
    const eqmatch = await prisma.equationMatch.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
    return eqmatch;
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error("Failed to upsert match.");
  }
}

// Function to get a match by ID
export async function getEquationMatchById(matchId: string) {
  try {
    const eqmatch = await prisma.equationMatch.findUnique({
      where: { id: matchId },
      include: {
        TeamInEquationMatch: true,
      },
    });
    return eqmatch;
  } catch (error) {
    console.error("Error retrieving match:", error);
    throw new Error("Failed to retrieve match.");
  }
}

// Obselete by upsert, Function to update a match
/*
export async function updateEquationMatch(matchId: string, data: EquationMatch) {
  try {
    const eqmatch = await prisma.equationMatch.update({
      where: { id: matchId },
      data,
    });
    return eqmatch;
  } catch (error) {
    console.error("Error updating match:", error);
    throw new Error("Failed to update match.");
  }
} */

// Function to delete a match
export async function deleteEquationMatch(matchId: string) {
  try {
    const eqmatch = await prisma.equationMatch.delete({
      where: { id: matchId },
    });
    return eqmatch;
  } catch (error) {
    console.error("Error deleting match:", error);
    throw new Error("Failed to delete match.");
  }
}

//-------------------------------- TEAM --------------------------------

// Function to upsert a team
export async function upsertTeam(data: Team) {
  try {
    const team = await prisma.team.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
    return team;
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to upsert team.");
  }
}

// Function to get a team by ID
export async function getTeamById(teamId: string) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        Equation: true,
        Job: true,
        User: true,
        TeamInEquationMatch: true,
      },
    });
    return team;
  } catch (error) {
    console.error("Error retrieving team:", error);
    throw new Error("Failed to retrieve team.");
  }
}

// Obsolete by upsert, Function to update a team
/*export async function updateTeam(teamId: string, data: Team) {
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
}*/

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

//-------------------------------- USER --------------------------------

// Function to upsert a user
export async function upsertUser(data: User) {
  try {
    const user = await prisma.user.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to upsert user.");
  }
}

// Function to get a user by ID
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Account: true,
        Equation: true,
        Session: true,
        Team: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new Error("Failed to retrieve user.");
  }
}

// Obsolete by upsert, Function to update a user
/*export async function updateUser(userId: string, data: user) {
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
}*/

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

// -------------------------------- EQUATION --------------------------------
// Function to create an equation
export async function upsertEquation(data: Equation) {
  try {
    console.log(data);
    const eq = await prisma.equation.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
    return eq;
  } catch (error) {
    console.error("Error upserting equation:", error);
    throw new Error("Failed to upsert equation.");
  }
}

// Function to get all equations

export async function getAllEquations() {
  try {
    const eqs = await prisma.equation.findMany({
      include: {
        Team: true,
        User: true,
      },
    });
    return eqs;
  } catch (error) {
    console.error("Error retrieving equations:", error);
    throw new Error("Failed to retrieve equations.");
  }
}

// Function to get all equations by a team

export async function getEquationsByTeamId(teamId: string) {
  try {
    const eqs = await prisma.equation.findMany({
      where: { team_id: teamId },
      include: {
        Team: true,
        User: true,
      },
    });
    return eqs;
  } catch (error) {
    console.error("Error retrieving equations:", error);
    throw new Error("Failed to retrieve equations.");
  }
}

// Function to get all equations by a user
export async function getEquationByUserId(userId: string) {
  try {
    const eqs = await prisma.equation.findMany({
      where: { user_id: userId },
      include: {
        Team: true,
        User: true,
      },
    });
    return eqs;
  } catch (error) {
    console.error("Error retrieving equations:", error);
    throw new Error("Failed to retrieve equations.");
  }
}

// Function to get a equaiton by ID
export async function getEquationById(eqId: string) {
  try {
    const eq = await prisma.equation.findUnique({
      where: { id: eqId },
      include: {
        Team: true,
        User: true,
      },
    });
    return eq;
  } catch (error) {
    console.error("Error retrieving equation:", error);
    throw new Error("Failed to retrieve equation.");
  }
}

// Function to delete an equation
export async function deleteEquation(eqId: string) {
  try {
    const eq = await prisma.equationMatch.delete({
      where: { id: eqId },
    });
    return eq;
  } catch (error) {
    console.error("Error deleting equation:", error);
    throw new Error("Failed to delete equation.");
  }
}

// -------------------------------- JOB --------------------------------
// Function to upsert a job
export async function upsertJob(data: Job) {
  try {
    const job = await prisma.job.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
    return job;
  } catch (error) {
    console.error("Error upserting job:", error);
    throw new Error("Failed to upsert job.");
  }
}

// Function to get a job by ID
export async function getJobById(jobId: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        Team: true,
      },
    });
    return job;
  } catch (error) {
    console.error("Error retrieving job:", error);
    throw new Error("Failed to retrieve job.");
  }
}

// Function to delete a job
export async function deleteJob(jobId: string) {
  try {
    const job = await prisma.job.delete({
      where: { id: jobId },
    });
    return job;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job.");
  }
}

//
export async function getAllTeams() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        Equation: true,
        Job: true,
        User: true,
        TeamInEquationMatch: true,
      },
    });
    return teams;
  } catch (error) {
    console.error("Error retrieving all teams:", error);
    throw new Error("Failed to retrieve all teams.");
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        Equation: true,
        Team: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw new Error("Failed to retrieve users.");
  }
}

export async function getAllMatches() {
  try {
    const matches = await prisma.equationMatch.findMany({
      include: {
        TeamInEquationMatch: true,
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
        User: true,
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
        Team: true,
        Equation: true,
      },
    });

    return users;
  } catch (error) {
    console.error("Error getting users", error);
    throw new Error("Failed to get users from team");
  }
}

export async function getUserByEpicId(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        epic_id: id,
      },
      include: {
        Team: true,
        Equation: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user", error);
    throw new Error("Failed to get user from epic id");
  }
}

export async function getUserByName(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: id,
      },
      include: {
        Team: true,
        Equation: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user", error);
    throw new Error("Failed to get user from epic id");
  }
}

export async function getEquationMatchesByTeamId(id: string) {
  try {
    const matches = await prisma.equationMatch.findMany({
      include: {
        TeamInEquationMatch: {
          where: {
            teamId: id,
          },
        },
      },
    });

    return matches;
  } catch (error) {
    console.error("Error getting matches", error);
    throw new Error("Failed to get matches from team");
  }
}

// -------------------------------- Verification Token --------------------------------

// Function to get a verification token by ID
export async function validateToken(token: string) {
  try {
    const tokenOut = await prisma.apiToken.findUnique({
      where: {
        token: token,
      },
    });
    return { token: tokenOut, valid: true };
  } catch (error) {
    return { token: null, valid: false };
  }
}

// Function to delete a Verification Token
export async function deleteVerificationToken(apiTokenId: string) {
  try {
    const apiToken = await prisma.apiToken.delete({
      where: { id: apiTokenId },
    });
    return apiToken;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job.");
  }
}
