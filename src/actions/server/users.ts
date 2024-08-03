import database from "@/config/database";
import { Prisma, Role, user as User } from "@prisma/client";
import bcrypt from "bcryptjs";
export const getUniqueUser = async (options: Prisma.userWhereUniqueInput) => {
	const user = database.user.findUnique({
		where: options,
	});
	return user;
};

export const createUser = async ({
	firstName,
	lastName,
	password,
}: {
	firstName: string;
	lastName: string;
	password: string;
}) => {
	return await database.user.create({
		data: {
			firstName,
			lastName,
      isVerified:false,
			password: bcrypt.hashSync(password),
			role: Role.student,
		},
	});
};
