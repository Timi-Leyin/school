import { createUser } from "@/actions/server/users";
import prisma from "@/config/database";
import errorHandler from "@/middlewares/error-handler";
import exclude from "@/utils/exclude-model";
import jwtPayload from "@/utils/jwt-payload";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const decoded = await jwtPayload(req);
		if (decoded.error || !decoded.decoded) {
			return NextResponse.json({ msg: decoded.error }, { status: 400 });
		}

		const user = exclude(decoded.decoded, ["password"]);

		const isNotStudent = user.role !== Role.student;
		const body = await req.json();

		if (!isNotStudent) {
			return NextResponse.json({ msg: "Access Denied" }, { status: 403 });
		}

		const newUser = await createUser({
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			matricNo: body.matricNo,
			password: body.password,
		});

		return NextResponse.json(
			{ msg: "Created Users", data: newUser },
			{ status: 201 }
		);
	} catch (error) {
		return errorHandler(error);
	}
};
