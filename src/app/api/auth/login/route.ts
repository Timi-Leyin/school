import { getUniqueUser } from "@/actions/server/users";
import bodyValidator from "@/middlewares/body-validator";
import errorHandler from "@/middlewares/error-handler";
import jwtPayload, { JwtSign } from "@/utils/jwt-payload";
import { loginSchema } from "@/validations/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (req: NextRequest) => {
  try {
    // REQUEST BODY VALIDATION
    const body = await req.json();
    const validator = bodyValidator(body, loginSchema);

    if (validator.errors) {
      return NextResponse.json(
        { msg: validator.errors[0] },
        { status: 400 }
      );
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
    const response = NextResponse.json(
      { msg: "Login Successfully" },
      { status: 200 }
    );
    response.cookies.set("s:id", token, {
      httpOnly: true,
      secure:true,
      sameSite:true,
      expires: new Date().setDate(new Date().getDate() + 1),
    });

    return response;
  } catch (error) {
    return errorHandler(error);
  }
};
