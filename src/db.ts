import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getAllTeams() {
  const allTeams = prisma.team.findMany();
  return allTeams;
}

export function getTeam(teamName: string) {
  const team = prisma.team.findUnique({
    where: {
      id: teamName,
    },
  });

  return team;
}
