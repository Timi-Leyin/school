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
	role,
	email,
	matricNo,
}: {
	firstName: string;
	lastName: string;
	password: string;
	role?: string;
	email?: string;
	matricNo?: string;
}) => {
	return await database.user.create({
		data: {
			firstName,
			lastName,
			isVerified: false,
			email,
			matricNo,
			password: bcrypt.hashSync(password),
			role: role ? (role as Role) : Role.student,
		},
	});
};
