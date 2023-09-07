import { Global, ThemeProvider, css } from "@emotion/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { DehydratedState } from "@tanstack/react-query";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMount } from "react-use";
import { Overlay } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { supabase } from "~/states/server/config";
import { font, more, reset } from "~/styles/base";
import { theme } from "~/styles/theme";
import * as Styled from "./_app.styles";

const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps
}: AppProps<{ dehydratedState: DehydratedState; session: Session }>) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  const router = useRouter();

  useMount(() => {
    supabase.auth.onAuthStateChange((state) => {
      if (state === "SIGNED_IN") {
        if (window.location.pathname === "/") router.replace(routes.home);
      }
    });
  });

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.session}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <title>TEAMVER</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Global
              styles={css`
                ${reset}
                ${more}
                ${font}
              `}
            />
            <Styled.Container id="container">
              <Component {...pageProps} />
              <Overlay />
            </Styled.Container>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default appWithTranslation(App);
