import { user } from "@prisma/client";

export type userWithoutPassword = Omit<user, "password">