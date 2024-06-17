// import { PrismaClient as PrismaClientEdge } from "@prisma/client/edge";
import { PrismaClient } from "@prisma/client";
const database = new PrismaClient();
// const edge = new PrismaClientEdge();
export default database;
