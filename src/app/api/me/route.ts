import exclude from "@/utils/exclude-model";
import jwtPayload from "@/utils/jwt-payload";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const decoded = await jwtPayload(req);
    if (decoded.error || !decoded.decoded) {
      return NextResponse.json({ msg: decoded.error }, { status: 400 });
    }

    const user = exclude(decoded.decoded, ["password"]);
    return NextResponse.json(
      {
        message: "User info Retrieved",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
};
