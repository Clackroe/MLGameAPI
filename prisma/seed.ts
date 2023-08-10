import { PrismaClient } from "@prisma/client";
import {
  randSportsTeam,
  randUserName,
  randAirportName,
  randEmail,
  randHex,
} from "@ngneat/falso";

const prisma = new PrismaClient();

import * as db from "../src/db";

const userImages = [
  "https://ml-bots.nyc3.digitaloceanspaces.com/DefaultPFP.png",
  "https://ml-bots.nyc3.digitaloceanspaces.com/DefaultPFP2.png",
  "https://ml-bots.nyc3.digitaloceanspaces.com/DefaultPFP3.png",
  "https://ml-bots.nyc3.digitaloceanspaces.com/DefaultPFP4.png",
];

const teamImages = [
  "https://ml-bots.nyc3.digitaloceanspaces.com/DefaultLogo2.png",
  "https://ml-bots.nyc3.digitaloceanspaces.com/DefaultLogo1.png",
  "https://ml-bots.nyc3.digitaloceanspaces.com/exampleImage.png",
];

export async function main() {
  //add Teams

  const NUM_TEAMS = 200;
  const NUM_USERS = 1200;

  const NUM_EQUATIONS = 4800;
  const NUM_MATCHES = 12000;

  for (let i = 0; i < NUM_TEAMS; i++) {
    await prisma.team.create({
      data: {
        name: `${randSportsTeam()}-${i + 1}`,
        logo: teamImages[Math.floor(Math.random() * teamImages.length)],
        primary: randHex(),
        secondary: randHex(),
        screen: randHex(),
        accent: randHex(),
      },
    });
  }

  const teams = await prisma.team.findMany();
  //add Users
  for (let i = 0; i < NUM_USERS; i++) {
    await prisma.user.create({
      data: {
        name: `${randUserName({ withAccents: false })}${i}`,
        email: `${randEmail()}${i}`,
        team_id: teams[i % NUM_TEAMS].id,
        image: userImages[Math.floor(Math.random() * userImages.length)],
      },
    });
  }

  const users = await prisma.user.findMany();

  //add Equations
  for (let i = 0; i < NUM_EQUATIONS; i++) {
    await prisma.equation.create({
      data: {
        name: `${randAirportName()}-${i}`,
        user_id: users[i % NUM_USERS].id,
        team_id: teams[i % NUM_TEAMS].id,
        content: "x^2 + y^2 = z^2",
      },
    });
  }

  //Add Equation Matches

  for (let i = 0; i < NUM_MATCHES; i++) {
    const date = new Date();
    await prisma.equationMatch.create({
      data: {
        status: "PENDING",
        ended: date,
      },
    });
  }

  const eqMatches = await prisma.equationMatch.findMany();
  const teams2 = await prisma.team.findMany();

  //Add Equation Match Equations
  for (const eqMatch of eqMatches) {
    const team1 = await prisma.team.findUnique({
      where: { id: teams2[Math.floor(Math.random() * teams.length)].id },
      include: { Equation: true },
    });
    if (!team1) throw new Error("Team not found");
    const eq1 =
      team1.Equation[Math.floor(Math.random() * team1.Equation.length)];
    const team1Score =
      parseInt(String(team1.mu)) +
      3 * parseInt(String(team1.sigma)) +
      Math.random() * (5 - -5) +
      -5;

    const team2 = await prisma.team.findUnique({
      where: { id: teams2[Math.floor(Math.random() * teams.length)].id },
      include: { Equation: true },
    });
    if (!team2) throw new Error("Team not found");
    const eq2 =
      team2.Equation[Math.floor(Math.random() * team2.Equation.length)];
    const team2Score =
      parseInt(String(team2.mu)) +
      3 * parseInt(String(team2.sigma)) +
      Math.random() * (5 - -5) +
      -5;

    await prisma.teamInEquationMatch.create({
      data: {
        equationMatchId: eqMatch.id,
        equationID: eq1.id,
        teamId: team1.id,
        mu_before: team1.mu,
        sigma_before: team1.sigma,
        score: team1Score,
        winner: team1Score > team2Score,
      },
    });
    await prisma.teamInEquationMatch.create({
      data: {
        equationMatchId: eqMatch.id,
        equationID: eq2.id,
        teamId: team2.id,
        mu_before: team2.mu,
        sigma_before: team2.sigma,
        score: team2Score,
        winner: team2Score > team1Score,
      },
    });
    db.updateEquationMatchTeamMuSigma(eqMatch.id);
  }
}

// async function test() {
//   const eqMatches2 = await prisma.equationMatch.findMany();
//   for (const eqMatch of eqMatches2) {
//     // console.log(eqMatch.id);
//     await db.updateEquationMatchTeamMuSigma(eqMatch.id);
//   }
// }

try {
  main();
} catch (e) {
  console.error(e);
}
