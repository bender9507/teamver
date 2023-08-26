import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routes } from "./constants/routes";
import type { Database } from "./types/database";

export const config = {
  matcher: ["/member"]
};

export const middleware = async (req: NextRequest) => {
  const { url } = req;

  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  const redirect = (_url: string) => {
    return NextResponse.redirect(new URL(_url, url));
  };

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect(routes.home);
  }

  return res;
};
