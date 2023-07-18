import * as utils from "./utils";

export async function getTeam(teamName: string) {
  const team = await utils.getTeamFromName(teamName);
  const teamID = team.id;

  const users = await utils.getUsersFromTeamID(teamID);
  const numUsers = users.length;

  const matches = await utils.getMatchesFromTeamID(teamID);
  const numMatches = matches.length;

  const models = await utils.getModelsFromTeamID(teamID);
  const numModels = models.length;

  const teamOut = {
    teamName: team.name,
    teamID: team.id,
    numUsers,
    numMatches,
    numModels,
    users,
    matches,
    models,
  };

  return teamOut;
}
