import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Payload } from "@/types/utils";
import { getUniqueUser } from "@/actions/server/users";

export default async (req: NextRequest) => {
  try {
    const token = await req.cookies.get("s:id")?.value;
    if (!token) {
      return {
        error: "Not Authorized",
      };
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user =await getUniqueUser({
      uuid: decoded.uuid,
    });
    if (user) {
      return {
        error: null,
        decoded: user,
      };
    }
    return {
      error: "User not Found",
    };
  } catch (error:any) {
    const {message} = error;
    return {
      error: message && message.replace("jwt", "Session") || "Invalid Authorization",
    };
  }
};

export const JwtSign = async (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30m",
  });
};
