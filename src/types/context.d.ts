import { user } from "@prisma/client";
import { userWithoutPassword } from "./global";

export interface UserContext {
  user:? userWithoutPassword;
}
