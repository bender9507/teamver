import type { Session } from "@supabase/auth-helpers-react";
import type { DehydratedState } from "@tanstack/react-query";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = { dehydratedState: DehydratedState }, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps<{
  dehydratedState: DehydratedState;
  initialSession: Session;
}> & {
  Component: NextPageWithLayout;
};
