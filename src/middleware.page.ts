import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getProfile } from "./states/server";
import type { Database } from "./types/database";

const PROTECTED_ROUTES = ["/user"];

export const middleware = async (req: NextRequest) => {
  const {
    nextUrl: { pathname },
    url
  } = req;

  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  const redirect = (_url: URL | string) => {
    return NextResponse.redirect(new URL(_url, url));
  };

  if (pathname === "/") {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) return;

    const profile = await getProfile(session.user.id);

    if (!profile) {
      return redirect("/welcome");
    }
  }

  if (PROTECTED_ROUTES.includes(pathname)) {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      return redirect("/");
    }
  }

  return res;
};
