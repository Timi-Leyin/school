import { createUser, getUniqueUser } from "@/actions/server/users";
import bodyValidator from "@/middlewares/body-validator";
import errorHandler from "@/middlewares/error-handler";
import { JwtSign } from "@/utils/jwt-payload";
import { registerSchema } from "@/validations/schema";
import { NextRequest, NextResponse } from "next/server";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import { isoUint8Array } from "@simplewebauthn/server/helpers";
import database from "@/config/database";
import { Prisma } from "@prisma/client";
import { RPID } from "@/constant";

export const POST = async (req: NextRequest) => {
	try {
		// REQUEST BODY VALIDATION
		const body = await req.json();
		const validator = bodyValidator(body, registerSchema);

		if (validator.errors) {
			return NextResponse.json({ msg: validator.errors[0] }, { status: 400 });
		}

		const user = await getUniqueUser({
			email: body.email,
		});

		if (user) {
			return NextResponse.json(
				{ msg: "user with email already exists" },
				{ status: 400 }
			);
		}

		const newUser = await createUser({
			firstName: body.firstName,
			lastName: body.lastName,
			password: body.password,
		});
	

		const options = await generateRegistrationOptions({
			rpName: "E-Voting",
			// rpID: "localhost",
			rpID: RPID,
			userID: isoUint8Array.fromUTF8String(newUser.uuid),
			userName: newUser.uuid,
			userDisplayName: newUser.firstName,
			attestationType: "indirect",
			authenticatorSelection: {
				userVerification: "preferred",
			},
		});
		await database.user.update({
            where:{
                uuid: newUser.uuid
            },
            data:{
                key: options as unknown as Prisma.JsonObject
            }
        })
		const response = NextResponse.json(
			{
				msg: "Registered Successfully.. Waiting for an approval from the adminstrator",
				options,
			},
			{ status: 200 }
		);

        const token = await JwtSign({
			uuid: newUser.uuid,
		});

		response.cookies.set("s:id", token, {
			httpOnly: true,
			secure: true,
			sameSite: true,
			expires: new Date().setDate(new Date().getDate() + 1),
		});

		return response;
	} catch (error) {
		return errorHandler(error);
	}
};
