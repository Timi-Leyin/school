import { getUniqueUser } from "@/actions/server/users";
import bodyValidator from "@/middlewares/body-validator";
import errorHandler from "@/middlewares/error-handler";
import jwtPayload, { JwtSign } from "@/utils/jwt-payload";
import { loginSchema } from "@/validations/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import database from "@/config/database";
import { Prisma } from "@prisma/client";
import { RPID } from "@/constant";
export const POST = async (req: NextRequest) => {
	try {
		// REQUEST BODY VALIDATION
		const body = await req.json();
		const validator = bodyValidator(body, loginSchema);

		if (validator.errors) {
			return NextResponse.json({ msg: validator.errors[0] }, { status: 400 });
		}

		const user = await getUniqueUser({
			email: body.email,
		});

		if (!user) {
			return NextResponse.json(
				{ msg: "Email or Password is Incorrect" },
				{ status: 400 }
			);
		}

		const verifyPassword = await bcrypt.compare(body.password, user.password);
	
		if (!verifyPassword) {
			return NextResponse.json(
				{ msg: "Email or Password is Incorrect" },
				{ status: 400 }
			);
		}

		const token = await JwtSign({
			uuid: user.uuid,
		});

		// const { credential } = user?.key as any;
		// const options = await generateAuthenticationOptions({
			// allowCredentials: [
			// 	{
			// 		id: credential ? (credential.credentialID || credential) : "",
			// 		transports: ["internal", "nfc"],
			// 	},
			// ],
		// 	userVerification: "preferred",
		// 	rpID:RPID,
		// });

		await database.user.update({
			where: { email: body.email },
			data: {
				// auth: options as unknown as Prisma.JsonObject,
			},
		});

		const response = NextResponse.json(
			{ msg: "Login Successfully", 
				// options 
			},
			{ status: 200 }
		);

		response.cookies.set("s:id", token, {
			httpOnly: true,
			secure: true,
			sameSite: true,
			expires: new Date().setDate(new Date().getDate() + 1),
		});

		return response;
	} catch (error) {
		console.log(error)
		return errorHandler(error);
	}
};
