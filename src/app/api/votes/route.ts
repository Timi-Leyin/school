import jwtPayload from "@/utils/jwt-payload";
import { NextRequest, NextResponse } from "next/server";
import { getAllVotes } from "@/actions/server/votes";
import database from "@/config/database";
import errorHandler from "@/middlewares/error-handler";

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
  } catch (error) {
    return errorHandler(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const decoded = await jwtPayload(req);
    if (decoded.error || !decoded.decoded) {
      return NextResponse.json({ msg: decoded.error }, { status: 400 });
    }
    
    const body = await req.formData();
    const allKeys = body.keys();
    const title = body.get("title") as string;
    const startDate = body.get("startDate") as string;
    const endDate = body.get("endDate") as string;
    const thumbnail = body.get("thumbnail"); // file
    const formDataEntries = Array.from(body.entries());
    console.log(startDate, endDate, "DDD")

    // Regular expression to match `options[n].text`
    const optionsTextRegex = /^options\[\d+\]\.text$/;

    const optionsTextEntries = formDataEntries.filter(([key, value]) =>
      optionsTextRegex.test(key)
    );

    const optionsTextValues = optionsTextEntries.map(([key, value]) => {
      return { text: value as string };
    });
    const d = new Date();
    const tommorrow = d.setDate(d.getDate() + 1);
    await database.votes.create({
      data: {
        title,
        startDate: new Date(startDate || Date.now()).toISOString(),
        endDate: new Date(endDate||tommorrow).toISOString(),
        createdBy: {
          connect: {
            uuid: decoded.decoded.uuid,
          },
        },
        options: {
          create: optionsTextValues,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Votes Created Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error)
    return errorHandler();
  }
};
