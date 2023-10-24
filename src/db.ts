import {
  PrismaClient,
  Team,
  User,
  /*TrainedMatch,*/ EquationMatch,
  Equation,
  /*Model,*/ Job /*VerificationToken*/,
  TeamInEquationMatch,
  UserInEquationMatch,
} from "@prisma/client";
// import e from "express";
import * as rank from "./ranking";
import { teamMatchRating, userMatchRating } from "./ranking";

const prisma = new PrismaClient();

// -------------------------------- EQUATION MATCH --------------------------------
// Function to create a match
export async function upsertEquationMatch(data: EquationMatch) {
  try {
    console.log(`Date provided: ${data.started}`);
    const eqmatch = await prisma.equationMatch.upsert({
      where: { id: data.id },
      create: {
        type: data.type || undefined,
        status: data.status || undefined,
        started: data.started || undefined,
        ended: data.ended || undefined,
        planned_start: data.planned_start || undefined,
      },
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
        UserInEquationMatch: true,
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
      create: {
        name: data.name,
        totalEqMatches: data.totalEqMatches || 0,
        totalEqMatchesWon: data.totalEqMatchesWon || 0,
        totalEqMatchesLost: data.totalEqMatchesLost || 0,
        accent: data.accent || undefined,
        logo: data.logo || undefined,
        primary: data.primary || undefined,
        secondary: data.secondary || undefined,
        screen: data.screen || undefined,
        districtId: data.districtId || undefined,
      },
      update: {
        name: data.name || undefined,
        totalEqMatches: data.totalEqMatches || undefined,
        totalEqMatchesWon: data.totalEqMatchesWon || undefined,
        totalEqMatchesLost: data.totalEqMatchesLost || undefined,
        accent: data.accent || undefined,
        logo: data.logo || undefined,
        primary: data.primary || undefined,
        secondary: data.secondary || undefined,
        screen: data.screen || undefined,
        districtId: data.districtId || undefined,
      },
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
        District: true,
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
      create: {
        name: data.name || undefined,
        email: data.email || undefined,
        epic_id: data.epic_id || undefined,
        discord_id: data.discord_id || undefined,
        team_id: data.team_id || undefined,
        image: data.image || undefined,
        perm_id: data.perm_id || undefined,
        totalEqMatches: data.totalEqMatches || 0,
        totalEqMatchesWon: data.totalEqMatchesWon || 0,
        totalEqMatchesLost: data.totalEqMatchesLost || 0,
      },
      update: {
        name: data.name || undefined,
        email: data.email || undefined,
        epic_id: data.epic_id || undefined,
        discord_id: data.discord_id || undefined,
        team_id: data.team_id || undefined,
        image: data.image || undefined,
        perm_id: data.perm_id || undefined,
        totalEqMatches: data.totalEqMatches || 0,
        totalEqMatchesWon: data.totalEqMatchesWon || 0,
        totalEqMatchesLost: data.totalEqMatchesLost || 0,
      },
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
        Perms: true,
        UserInEquationMatch: true,
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
      create: {
        name: data.name || undefined,
        user_id: data.user_id || undefined,
        team_id: data.team_id || undefined,
        elo_contribute: data.elo_contribute || undefined,
        content: data.content || undefined,
      },
      update: {
        name: data.name || undefined,
        team_id: data.team_id || undefined,
        user_id: data.user_id || undefined,
        elo_contribute: data.elo_contribute || undefined,
        content: data.content || undefined,
      },
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
        District: true,
      },
    });
    return teams;
  } catch (error) {
    console.error("Error retrieving all teams:", error);
    throw new Error("Failed to retrieve all teams.");
  }
}

export async function getAllTeamsByDistrict(district_id: string) {
  try {
    const teams = await prisma.team.findMany({
      where: {
        districtId: district_id,
      },
      include: {
        Equation: true,
        Job: true,
        User: true,
        TeamInEquationMatch: true,
        District: true,
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
        Perms: true,
        UserInEquationMatch: true,
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
        UserInEquationMatch: true,
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
        District: true,
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
        Perms: true,
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
        Perms: true,
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
        Perms: true,
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
    upsertTeam;
    throw new Error("Failed to get matches from team");
  }
}

export async function getEquationMatchesByUserId(id: string) {
  try {
    const matches = await prisma.equationMatch.findMany({
      include: {
        UserInEquationMatch: {
          where: {
            userId: id,
          },
        },
      },
    });

    return matches;
  } catch (error) {
    console.error("Error getting matches", error);
    upsertUser;
    throw new Error("Failed to get matches from user");
  }
}
// -------------------------------- UserInEquationMatch --------------------------------
//Erin - May want to come back and complete CRUD
export async function updateEquationMatchUserMuSigma(eqMatchID: string) {
  try {
    const ratings = await getUserMatchRatings(eqMatchID);

    await updateUserScores(ratings);

    await prisma.equationMatch.update({
      where: {
        id: eqMatchID,
      },
      data: {
        ended: new Date(),
        status: "FINISHED",
      },
    });
  } catch (error) {
    console.error("Error updating EquationMatch User Mu Sigma:", error);
    throw new Error("Failed to update EquationMatch User Mu Sigma.");
  }
}
// -------------------------------- TeamInEquationMatch --------------------------------

export async function getTeamInEquationMatchesByMatchID(id: string) { //Erin - don't need to recreate with User b/c this is not called anywhere?
  try {
    const teamInEquationMatch = await prisma.teamInEquationMatch.findMany({
      where: {
        equationMatchId: id,
      },
      include: {
        Equation: true,
        Team: true,
        EquationMatch: true,
      },
    });

    return teamInEquationMatch;
  } catch (error) {
    console.error("Error getting TeamInEquationMatch");
  }
}

export async function upsertTeamInEquationmatch(data: TeamInEquationMatch) { //Erin - don't need to recreate with User b/c this is not called anywhere?
  try {
    const team = await prisma.team.findUnique({
      where: {
        id: data.teamId,
      },
    });

    const teamInEquationMatch = await prisma.teamInEquationMatch.upsert({
      where: { id: data.id },
      create: {
        ...data,
        global_mu_before: team.global_mu,
        global_sigma_before: team.global_sigma,
      },
      update: data,
    });
    return teamInEquationMatch;
  } catch (error) {
    console.error("Error upserting TeamInEquationMatch:", error);
    throw new Error("Failed to upsert TeamInEquationMatch.");
  }
}

export async function deleteTeamInEquationMatch(id: string) { //Erin - don't need to recreate with User b/c this is not called anywhere?
  try {
    const teamInEquationMatch = await prisma.teamInEquationMatch.delete({
      where: { id: id },
    });
    return teamInEquationMatch;
  } catch (error) {
    console.error("Error deleting TeamInEquationMatch:", error);
    throw new Error("Failed to delete TeamInEquationMatch.");
  }
}

export async function updateEquationMatchTeamMuSigma(eqMatchID: string) {
  try {
    const ratings = await getTeamMatchRatings(eqMatchID);

    await updateScores(ratings);

    await prisma.equationMatch.update({
      where: {
        id: eqMatchID,
      },
      data: {
        ended: new Date(),
        status: "FINISHED",
      },
    });
  } catch (error) {
    console.error("Error updating EquationMatch Team Mu Sigma:", error);
    throw new Error("Failed to update EquationMatch Team Mu Sigma.");
  }
}


export async function addTeamToEquationMatch(
  matchID: string,
  equationID: string,
  teamID: string,
  score: number,
  winner: boolean
) {
  try {
    const team = await prisma.team.findUnique({
      where: {
        id: teamID,
      },
    });

    const match = await prisma.teamInEquationMatch.create({
      data: {
        equationMatchId: matchID,
        equationID: equationID,
        teamId: teamID,
        district_mu_before: team.district_mu,
        district_sigma_before: team.district_sigma,
        global_mu_before: team.global_mu,
        global_sigma_before: team.global_sigma,
        
        districtId: team.districtId,

        score: score,
        winner: winner,
      },
    });

    const printMatch = JSON.stringify(match);
    return match.equationMatchId;
  } catch (error) {
    console.error("Error adding team", error);
    throw new Error("Failed to add team to the match...");
  }
}

// -------------------------------- Verification Token --------------------------------

// Function to get a verification token by ID
export async function validateToken(token: string) {
  try {
    const tokenOut = await prisma.apiToken.findUnique({
      where: {
        id: token,
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

//----District---

// -------------------------------- Team Match Rating --------------------------------

type TeamMatchData = {
  global_sigma_before: number;
  global_mu_before: number;
  district_sigma_before: number;
  district_mu_before: number;
  districtId: string;
  score: number;
  teamId: string;
  matchId: string;
  equationMatchId: string;
  teamInEquationMatchID: string;
};



async function getTeamMatchRatings(
  eqMatchID: string
): Promise<{ Global: teamMatchRating[]; District?: teamMatchRating[] }> {
  try {
    const match = await prisma.equationMatch.findUnique({
      where: {
        id: eqMatchID,
      },
      include: {
        TeamInEquationMatch: true,
      },
    });

    const teamsAll: TeamMatchData[] = match.TeamInEquationMatch.map(
      (team: TeamInEquationMatch) => {
        return {
          global_sigma_before: team.global_sigma_before.toNumber(),
          global_mu_before: team.global_mu_before.toNumber(),

          district_sigma_before: team.district_sigma_before.toNumber(),
          district_mu_before: team.district_mu_before.toNumber(),

          districtId: team.districtId,

          score: team.score,
          teamId: team.teamId,
          matchId: team.equationMatchId,
          equationMatchId: team.equationMatchId,
          teamInEquationMatchID: team.id,
        };
      }
    );

    const teamsGlobal: teamMatchRating[] = teamsAll.map(
      (team: TeamMatchData) => {
        return {
          sigma_before: team.global_sigma_before,
          mu_before: team.global_mu_before,
          score: team.score,
          teamId: team.teamId,
          matchId: team.equationMatchId,
          teamInEquationMatchID: team.teamInEquationMatchID,
        };
      }
    );

    if (areSameDistrict(teamsAll)) {
      //update Global and District
      const teamsDistrict: teamMatchRating[] = teamsAll.map(
        (team: TeamMatchData) => {
          return {
            sigma_before: team.district_sigma_before,
            mu_before: team.district_mu_before,
            score: team.score,
            teamId: team.teamId,
            matchId: team.equationMatchId,
            teamInEquationMatchID: team.teamInEquationMatchID,
          };
        }
      );
      return { Global: teamsGlobal, District: teamsDistrict };
      // returnData(teamsDistrict);
    } else {
      return { Global: teamsGlobal };
    }

    //---
  } catch (error) {
    console.error("Error updating EquationMatch Team Mu Sigma:", error);
    throw new Error("Failed to update EquationMatch Team Mu Sigma.");
  }
}

function areSameDistrict(teams: TeamMatchData[]): boolean {
  const districtIds = teams.map((team) => team.districtId);
  const uniqueDistrictIds = [...new Set(districtIds)];
  return uniqueDistrictIds.length === 1;
}

async function updateScores(ratings: {
  Global: teamMatchRating[];
  District?: teamMatchRating[];
}) {
  const global_ratings = rank.calculateRankings(ratings.Global);

  const district_ratings = ratings.District
    ? rank.calculateRankings(ratings.District)
    : null;

  global_ratings.map(async (team) => {
    await prisma.team.update({
      where: {
        id: team.teamId,
      },
      data: {
        global_mu: team.mu_after,
        global_sigma: team.sigma_after,
        global_ranking: team.ranking,
      },
    });
    await prisma.teamInEquationMatch.update({
      where: {
        id: team.teamInEquationMatchID,
      },
      data: {
        global_mu_after: team.mu_after,
        global_sigma_after: team.sigma_after,
        global_ranking_after: team.ranking,
      },
    });
  });

  if (district_ratings != null) {
    district_ratings.map(async (team) => {
      await prisma.team.update({
        where: {
          id: team.teamId,
        },
        data: {
          district_mu: team.mu_after,
          district_sigma: team.sigma_after,
          district_ranking: team.ranking,
        },
      });
      await prisma.teamInEquationMatch.update({
        where: {
          id: team.teamInEquationMatchID,
        },
        data: {
          district_mu_after: team.mu_after,
          district_sigma_after: team.sigma_after,
          district_ranking_after: team.ranking,
        },
      });
    });
  }
}

// -------------------------------- User Match Rating --------------------------------
type UserMatchData = {
  global_sigma_before: number;
  global_mu_before: number;
  score: number;
  userId: string;
  matchId: string;
  equationMatchId: string;
  userInEquationMatchID: string;
}

async function getUserMatchRatings(
  eqMatchID: string
): Promise<{ Global: userMatchRating[]}> {
  try {
    const match = await prisma.equationMatch.findUnique({
      where: {
        id: eqMatchID,
      },
      include: {
        UserInEquationMatch: true,
      },
    });

    const usersAll: UserMatchData[] = match.UserInEquationMatch.map(
      (user: UserInEquationMatch) => {
        return {
          global_sigma_before: user.user_global_sigma_before.toNumber(),
          global_mu_before: user.user_global_mu_before.toNumber(),

          score: user.score,
          userId: user.userId,
          matchId: user.equationMatchId,
          equationMatchId: user.equationMatchId,
          userInEquationMatchID: user.id,
        };
      }
    );

    const usersGlobal: userMatchRating[] = usersAll.map(
      (user: UserMatchData) => {
        return {
          sigma_before: user.global_sigma_before,
          mu_before: user.global_mu_before,
          score: user.score,
          userId: user.userId,
          matchId: user.equationMatchId,
          userInEquationMatchID: user.userInEquationMatchID,
        };
      }
    );

      return { Global: usersGlobal }

    //---
  } catch (error) {
    console.error("Error updating EquationMatch User Mu Sigma:", error);
    throw new Error("Failed to update EquationMatch User Mu Sigma.");
  }
}


async function updateUserScores(ratings: {Global: userMatchRating[]}) {
  const global_ratings = rank.calculateUserRankings(ratings.Global);


  global_ratings.map(async (user) => {
    await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        global_mu: user.mu_after,
        global_sigma: user.sigma_after,
        global_ranking: user.ranking,
      },
    });
    await prisma.userInEquationMatch.update({
      where: {
        id: user.userInEquationMatchID,
      },
      data: {
        user_global_mu_after: user.mu_after,
        user_global_sigma_after: user.sigma_after,
        user_global_ranking_after: user.ranking,
      },
    });
  });

}
