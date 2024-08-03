import prisma from "@/config/database";
import errorHandler from "@/middlewares/error-handler";
import exclude from "@/utils/exclude-model";
import jwtPayload from "@/utils/jwt-payload";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const decoded = await jwtPayload(req);
    if (decoded.error || !decoded.decoded) {
      return NextResponse.json({ msg: decoded.error }, { status: 400 });
    }

    const user = exclude(decoded.decoded, ["password"]);

    const isNotStudent = user.role !== Role.student;

    // if (!isNotStudent) {
    //   return NextResponse.json({ msg: "Access Denied" }, { status: 403 });
    // }

    const users = await prisma.user.findMany({
      where: {
        role:
          user.role === Role.admin
            ? undefined
            : user.role === Role.lecturer
            ? { not: Role.admin }
            : undefined,
      },
    });

    const $users = users.map((u) => exclude(u, ["password"]));

    return NextResponse.json(
      { msg: "Retrieved Users", data: $users },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
