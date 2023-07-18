import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function insertMockData() {
  prisma.team.createMany({
    data: [
      {
        id: "team-1",
        players: ["player-1", "player-2"],
        model: [
          {
            id: "model-1",
            name: "Model A",
            url: "https://example.com/model-a",
          },
          {
            id: "model-2",
            name: "Model B",
            url: "https://example.com/model-b",
          },
        ],
        user: [
          {
            id: "user-1",
            discord_id: "123456789",
            name: "John Doe",
          },
          {
            id: "user-2",
            discord_id: "987654321",
            name: "Jane Smith",
          },
        ],
      },
      {
        id: "team-2",
        players: ["player-3", "player-4"],
        model: [
          {
            id: "model-3",
            name: "Model X",
            url: "https://example.com/model-x",
          },
          {
            id: "model-4",
            name: "Model Y",
            url: "https://example.com/model-y",
          },
        ],
        user: [
          {
            id: "user-3",
            discord_id: "543210987",
            name: "Mike Johnson",
          },
        ],
      },
    ],
  });
}
