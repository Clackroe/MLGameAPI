import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllTeams() {
  const allTeams = await prisma.user.findMany();
  // console.log(allTeams);
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
