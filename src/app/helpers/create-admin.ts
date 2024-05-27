import database from "@/config/database";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
export default async () => {
  return await database.user.create({
    data: {
      firstName: "Timileyin",
      lastName: "Oyelekan",
      password: bcrypt.hashSync("password"),
      role: Role.admin,
    },
  });
};
