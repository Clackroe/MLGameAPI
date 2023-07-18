import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function testFunc() {
  console.log("testFunc");
}
