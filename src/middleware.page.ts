import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routes } from "./constants/routes";
import { getProfile } from "./states/server";
import type { Database } from "./types/database";

// 비로그인 접근 금지
const SESSION_PROTECTED_ROUTES = ["/member"];

// 로그인한 유저 접근 금지
const LOGIN_PROTECTED_ROUTES = ["/", "/welcome"];

export const config = {
  matcher: ["/", "/welcome", "/member"]
};

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

  const {
    data: { session }
  } = await supabase.auth.getSession();

  let hasProfile = false;

  if (session) {
    hasProfile = !!(await getProfile(session.user.id));
  }

  if (SESSION_PROTECTED_ROUTES.includes(pathname)) {
    if (hasProfile) return;

    return redirect(routes.home);
  }

  if (LOGIN_PROTECTED_ROUTES.includes(pathname)) {
    if (hasProfile) return redirect(routes.member);
  }

  return res;
};
