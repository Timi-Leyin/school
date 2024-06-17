import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwtPayload from "./utils/jwt-payload";
import envTypeDefs from "env-type-defs"
export async function middleware(request: NextRequest) {
  // envTypeDefs()
  console.log("> ", request.url);
}

export const config = {
  matcher: ["/api/me/:path*"],
};
