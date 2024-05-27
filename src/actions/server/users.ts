import database from "@/config/database";
import { Prisma } from "@prisma/client";
export const getUniqueUser = async (options: Prisma.userWhereUniqueInput) => {
  const user = database.user.findUnique({
    where: options,
  });
  return user
}; 
