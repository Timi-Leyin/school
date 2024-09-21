import { VoteData, userWithoutPassword } from "./global";

export interface ResponseT {
  msg: string;
}

export interface UserContextResponse extends ResponseT {
  data: userWithoutPassword;
}
export interface ResWithData extends ResponseT {
  data: any;
}
export interface GetUsersResponse extends ResponseT {
  data: userWithoutPassword[];
}

export interface GetAllVotesResponse extends ResponseT {
  data: VoteData[];
}

export interface GetVotesResponse extends ResponseT {
  data: VoteData;
}
