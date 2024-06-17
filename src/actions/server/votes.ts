import database from "@/config/database";
import { Prisma } from "@prisma/client";
export const getAllVotes = async (options?: Prisma.votesWhereUniqueInput) => {
  const votes = database.votes.findMany({
    where: options,
    include: {
      createdBy: {
        select: {
          role: true,
          email: true,
        },
      },
    },
  });
  return votes;
};
