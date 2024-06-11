import { userWithoutPassword } from "./global";

export interface ResponseT {
  msg: string;
}

export interface UserContextResponse extends ResponseT {
  data: userWithoutPassword;
}
export interface GetUsersResponse extends ResponseT {
  data: userWithoutPassword[];
}
