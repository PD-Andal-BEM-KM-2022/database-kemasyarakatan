import { NextRequest, NextResponse } from "next/server";export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request
  const hostname = req.headers.get("host") || process.env.VERCEL_URL;

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.vercel.pub`, "")
          .replace(`.platformize.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "");

  if (currentHost == "admin") {
    if (
      url.pathname === "/login" &&
      (req.cookies.get("next-auth.session-token") ||
        req.cookies.get("__Secure-next-auth.session-token"))
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (hostname === "localhost:3000" || hostname === "platformize.vercel.app") {
    url.pathname = `/home${url.pathname}`;
    return NextResponse.rewrite(url);
  }

    return NextResponse.rewrite(url);
}
