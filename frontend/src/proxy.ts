import { NextResponse, type NextRequest } from "next/server";

// Auth is disabled for the hackathon: the proxy no longer gates any route.
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|geojson)$).*)",
  ],
};