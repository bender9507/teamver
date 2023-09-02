import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routes } from "./constants/routes";
import type { Database } from "./types/database";

const PUBLIC_FILE = /\.(.*)$/;

const sessions = ["home", "profile", "project", "like", "chat"];

export const middleware = async (req: NextRequest) => {
  const { url } = req;

  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  const redirect = (_url: string) => {
    return NextResponse.redirect(new URL(_url, url));
  };

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

  if (sessions.includes(req.nextUrl.pathname.split("/")[1])) {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      return redirect(routes.home);
    }
  }

  return res;
};
