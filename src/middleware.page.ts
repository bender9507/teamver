import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const selectedLocale = req.cookies.get("locale")?.value ?? "ko";

  if (req.nextUrl.locale !== selectedLocale) {
    return NextResponse.redirect(
      new URL(`/${selectedLocale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }

  return res;
};
