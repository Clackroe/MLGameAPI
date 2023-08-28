import { rating, rate, ordinal } from "openskill";

type teamMatchRating = {
  sigma_before: number;
  sigma_after?: number;
  mu_before: number;
  score: number;
  teamId: string;
  matchId: string;
  teamInEquationMatchID: string;
};
interface ratedTeamMatch extends teamMatchRating {
  mu_after: number;
  sigma_after: number;
  ranking: number;
}

export function calculateRankings(teams: teamMatchRating[]): ratedTeamMatch[] {
  const teamRatings = teams.map((team) => {
    return [rating({ mu: team.mu_before, sigma: team.sigma_before })]; // Assuming team has no players
  });

  const scores = teams.map((team) => team.score);

  const newRankings = rate(teamRatings, { score: scores });

  // Create new team objects with updated data while preserving the IDs
  const newTeamsWithIds = teams.map((teamWithId, index) => {
    const updatedTeam = {
      ...teamWithId,
      mu_after: newRankings[index][0].mu,
      sigma_after: newRankings[index][0].sigma,
      ranking: ordinal(newRankings[index][0]),
    };

    return updatedTeam;
  });

  return newTeamsWithIds;
}
