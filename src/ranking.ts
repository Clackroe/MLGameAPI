import { rating, rate, ordinal } from "openskill";

export type teamMatchRating = {
  sigma_before: number;
  sigma_after?: number;
  mu_before: number;
  score: number;
  teamId: string;
  matchId: string;
  teamInEquationMatchID: string;
};

export type userMatchRating = {
  sigma_before: number;
  sigma_after?: number;
  mu_before: number;
  score: number;
  userId: string;
  matchId: string;
  userInEquationMatchID: string;
}

interface ratedUserMatch extends userMatchRating {
  mu_after: number,
  sigma_after: number,
  ranking: number,
  rank_title: string,
}

interface ratedTeamMatch extends teamMatchRating {
  mu_after: number;
  sigma_after: number;
  ranking: number;
}

const rankTitles = [
  {max: 0, title: "Charcoal"},
  {max: 200, title: "Bronze_1"},
  {max: 600, title: "Bronze_2"},
  {max: 1000, title: "Bronze_3"},
  {max: 1400, title: "Silver_1"},
  {max: 2200, title: "Silver_2"},
  {max: 3000, title: "Silver_3"},
  {max: 4000, title: "Gold_1"},
  {max: 5000, title: "Gold_2"},
  {max: 6000, title: "Gold_3"},
  {max: 6800, title: "Silicon_1"},
  {max: 8400, title: "Silicon_2"},
  {max: 10000, title: "Silicon_3"},
  {max: 11000, title: "Diamond_1"},
  {max: 13000, title: "Diamond_2"},
  {max: 15000, title: "Diamond_3"},
  {max: 21000, title: "Champ_1"},
  {max: 23000, title: "Champ_2"},
  {max: 25000, title: "Champ_3"},
  {max: 27000, title: "Grand Champ 1"},
  {max: 31000, title: "Grand Champ 2"},
  {max: 35000, title: "Grand Champ 3"},
  {max: Number.POSITIVE_INFINITY, title: "Legend"}
]


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

export function calculateUserRankings(users: userMatchRating[]): ratedUserMatch[] {
  const userRatings = users.map((user) => {
    return [rating({ mu: user.mu_before, sigma: user.sigma_before })];
  });

  const scores = users.map((user) => user.score);

  const newRankings = rate(userRatings, { score: scores });

  // Create new user objects with updated data while preserving the IDs
  const newUsersWithIds = users.map((userWithId, index) => {

  // Erin - Assign the value of 'title' based on if the new ranking is less than the max of a range
    let title = "";
    const compare = ordinal(newRankings[index][0]) * 1000; // multiply by 1000 to get "rank" from rating
    for(let i = 0; i < rankTitles.length; i++) {
      if(compare < rankTitles[i].max) {
        if(compare > 35000) {
          title = rankTitles[rankTitles.length].title;
          break;
        }
        title = rankTitles[i].title;
        break;
      }
    }

    const updatedUser = {
      ...userWithId,
      mu_after: newRankings[index][0].mu,
      sigma_after: newRankings[index][0].sigma,
      ranking: ordinal(newRankings[index][0]),
      rank_title: title,
    };

    return updatedUser;
  });

  return newUsersWithIds;
}
