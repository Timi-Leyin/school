import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwtPayload from "./utils/jwt-payload";

export async function middleware(request: NextRequest) {
  console.log("> ", request.url);
}

export const config = {
  matcher: ["/api/me/:path*"],
};
