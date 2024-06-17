import { user } from "@prisma/client";

export type userWithoutPassword = Omit<user, "password">;

type VoteOptions = {
  text: string;
};

export type newVoteType = {
  endDate: string;
  options: VoteOptions[];
  startDate: string;
  title: string;
  visibility: "public" | "private";
  whoCanVote: "everyone";
};
