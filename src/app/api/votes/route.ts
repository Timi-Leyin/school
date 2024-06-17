import jwtPayload from "@/utils/jwt-payload";
import { NextRequest, NextResponse } from "next/server";
import { getAllVotes } from "@/actions/server/votes";
export const GET = async (req: NextRequest) => {
  try {
    const decoded = await jwtPayload(req);
    if (decoded.error || !decoded.decoded) {
      return NextResponse.json({ msg: decoded.error }, { status: 400 });
    }

    const votes = await getAllVotes();
    return NextResponse.json(
      {
        message: "Votes Retrieved",
        data: votes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
};

export const POST = async (req: NextRequest) => {
  try {
    const decoded = await jwtPayload(req);
    if (decoded.error || !decoded.decoded) {
      return NextResponse.json({ msg: decoded.error }, { status: 400 });
    }

    const body = await req.json();

    return NextResponse.json(
      {
        message: "Votes Created Successfully",
        // data: votes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
};
