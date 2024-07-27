import { currentVotes, Role, user, voteOptions, votes } from "@prisma/client";

export type userWithoutPassword = Omit<user, "password">;

type $VoteOptions = {
  text: string;
};

export type newVoteType = {
  endDate: string;
  options: $VoteOptions[];
  startDate: string;
  title: string;
  visibility: "public" | "private";
  whoCanVote: "everyone";
};

// SCHEMA

type createdBy = {
  role: Role;
  email: string;
};
export interface VoteData extends votes {
  createdBy: createdBy;
  currentVotes: currentVotes[];
  options: voteOptions[];
  thumbnail: {
    src: string;
    alt: string;
  };
}
