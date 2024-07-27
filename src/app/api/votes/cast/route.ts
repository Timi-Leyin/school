import { getAllVotes } from "@/actions/server/votes";
import database from "@/config/database";
import errorHandler from "@/middlewares/error-handler";
import jwtPayload from "@/utils/jwt-payload";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const decoded = await jwtPayload(req);
    if (decoded.error || !decoded.decoded) {
      return NextResponse.json({ msg: decoded.error }, { status: 400 });
    }

    const { voteId, voteOptionId } = await req.json();
    const alreadyVoted = await database.votes.findFirst({
      where: {
        uuid: voteId,
        currentVotes: {
          some: {
            userId: decoded.decoded.uuid,
            // voteOptionsId: voteOptionId
          },
        },
      },
    });
    if (alreadyVoted) {
      await database.currentVotes.deleteMany({
        where: {
          userId: decoded.decoded.uuid,
          votesId: voteId,
        },
      });
      //   return NextResponse.json(
      //     { msg: "You have already voted" },
      //     { status: 400 }
      //   );
    }

    const voteUpdate = await database.votes.update({
      where: {
        uuid: voteId,
      },
      data: {
        currentVotes: {
          create: {
            option: { connect: { uuid: voteOptionId } },
            user: { connect: { uuid: decoded.decoded.uuid } },
          },
        },
      },
    });

    return NextResponse.json(
      { msg: "Vote Successfully", data: voteUpdate },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
