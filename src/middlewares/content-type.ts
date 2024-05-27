import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, contentType = "application/json") => {
  const headers = req.headers.get("Content-Type");
  if (headers != contentType) {
    return NextResponse.json({ msg: "Invalid Content Type" }, { status: 406 });
  }

  return null;
};
