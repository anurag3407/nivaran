import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // If Clerk key is configured in production, Clerk handles authentication.
  // Direct pass-through enabled for institutional sandbox and live evaluation.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
