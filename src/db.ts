import * as utils from "./utils";

export async function getTeam(teamName: string) {
  const team = await utils.getTeamFromName(teamName);
  const teamID = team.id;
  return getTeamData(teamID);
}

export async function getUser(userID: string) {
  const user = await utils.getUserFromID(userID);
  const teamID = user.team_id;
  const team = await utils.getTeamFromID(teamID);
  const teamName = team.name;

  const userOut = {
    name: user.name,
    discord_id: user.discord_id,
    epic_id: user.epic_id,
    teamName,
    teamID,
  };

  return userOut;
}

async function getTeamData(teamID: string) {
  const team = await utils.getTeamFromID(teamID);
  const users = await utils.getUsersFromTeamID(teamID);
  const numUsers = users.length;

  const matches = await utils.getMatchesFromTeamID(teamID);
  const numMatches = matches.length;

  const models = await utils.getModelsFromTeamID(teamID);
  const numModels = models.length;

  const teamOut = {
    teamName: team.name,
    teamID,
    numUsers,
    numMatches,
    numModels,
    users,
    matches,
    models,
  };

  return teamOut;
}

export async function getMatch(matchID: string) {
  const match = await utils.getMatchFromID(matchID);
  const team1 = await utils.getTeamFromID(match.team_1);
  const team2 = await utils.getTeamFromID(match.team_2);

  const matchOut = {
    matchID,
    team1: team1.name,
    team2: team2.name,
    team1Model: match.team_1_model,
    team2Model: match.team_2_model,
    team1Score: match.team_1_score,
    team2Score: match.team_2_score,
    date: match.timestamp,
  };

  return matchOut;
}

export async function getAllTeams() {
  const teamIDs = await utils.getAllTeamIDs();

  const allTeams = [];

  for (const teamID of teamIDs) {
    const team = await getTeamData(teamID);
    allTeams.push(team);
  }

  return { teams: allTeams, numTeams: allTeams.length };
}

export async function getAllUsers() {
  const userIDs = await utils.getAllUserIDs();

  const allUsers = [];

  for (const userID of userIDs) {
    const user = await getUser(userID);
    allUsers.push(user);
  }

  return { users: allUsers, numUsers: allUsers.length };
}

export async function getAllMatches() {
  const matchIDs = await utils.getAllMatchIDs();

  const allMatches = [];

  for (const matchID of matchIDs) {
    const match = await getMatch(matchID);
    allMatches.push(match);
  }

  return { matches: allMatches, numMatches: allMatches.length };
}

export async function getTeamUsers(teamName: string) {
  const team = await utils.getTeamFromName(teamName);
  const teamID = team.id;
  const users = await utils.getUsersFromTeamID(teamID);

  return { users, numUsers: users.length };
}

export async function getTeamMatches(teamName: string) {
  const team = await utils.getTeamFromName(teamName);
  const teamID = team.id;
  const matches = await utils.getMatchesFromTeamID(teamID);

  return { matches, numMatches: matches.length };
}

export async function getTeamModels(teamName: string) {
  const team = await utils.getTeamFromName(teamName);
  const teamID = team.id;
  const models = await utils.getModelsFromTeamID(teamID);

  return { models, numModels: models.length };
}

export async function getModel(modelID: string) {
  const model = await utils.getModelFromID(modelID);
  const team = await utils.getTeamFromID(model.team_id);

  const modelOut = {
    modelID,
    name: model.name,
    teamName: team.name,
    teamID: team.id,
  };

  return modelOut;
}
