import { ORIGIN, RPID } from "@/constant";
import errorHandler from "@/middlewares/error-handler";
import jwtPayload from "@/utils/jwt-payload";
import { Prisma } from "@prisma/client";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const decoded = await jwtPayload(req);
		if (decoded.error || !decoded.decoded) {
			return NextResponse.json({ msg: decoded.error }, { status: 400 });
		}
		const { response } = await req.json();
		if (decoded.decoded.auth) {
			const { credential } = decoded.decoded.key as any;
			const verification = await verifyAuthenticationResponse({
				response,
				expectedChallenge: (decoded.decoded.auth as any).challenge,
				expectedOrigin: ORIGIN,
				expectedRPID: RPID,
				authenticator: credential,
				requireUserVerification: true,
			});

			return NextResponse.json(
				{
					msg: "Verification Successfully",
					data: { verified: verification.verified },
				},
				{ status: 200 }
			);
		}
		return NextResponse.json(
			{
				msg: "Invalid Verification",
				data: { verified: false },
			},
			{ status: 400 }
		);
	} catch (error) {
		return errorHandler(error);
	}
};
