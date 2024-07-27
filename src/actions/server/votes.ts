import database from "@/config/database";
import { Prisma } from "@prisma/client";
export const getAllVotes = async (options?: Prisma.votesWhereUniqueInput) => {
  const votes = database.votes.findMany({
    where: options,
    include: {
      currentVotes: true,
      options: true,
      thumbnail: {
        select: {
          src: true,
          alt: true,
        },
      },
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
