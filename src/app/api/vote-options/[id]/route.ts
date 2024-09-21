import { getAllVotes } from "@/actions/server/votes";
import errorHandler from "@/middlewares/error-handler";
import jwtPayload from "@/utils/jwt-payload";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const decoded = await jwtPayload(req);
    if (decoded.error || !decoded.decoded) {
      return NextResponse.json({ msg: decoded.error }, { status: 400 });
    }

    const votes = await getAllVotes({
      uuid: params.id,
    });

    if (!votes) {
      return NextResponse.json(
        {
          message: "Vote details not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Votes retrieved",
        data: votes[0],
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
