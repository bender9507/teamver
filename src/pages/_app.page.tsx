import { Global, ThemeProvider, css } from "@emotion/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { DehydratedState } from "@tanstack/react-query";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation, useTranslation } from "next-i18next";
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
import type { OneOfLanguage } from "~/types";
import * as Styled from "./_app.styles";

const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps
}: AppProps<{ dehydratedState: DehydratedState; initialSession: Session }>) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const { i18n } = useTranslation();

  const router = useRouter();

  useMount(() => {
    const locale = localStorage.getItem("locale") ?? "ko";

    if (locale !== i18n.language) {
      router.replace(router.asPath, router.asPath, { locale });
    }

    supabase.auth.onAuthStateChange((state) => {
      if (state === "SIGNED_IN") {
        router.push(routes.home);
      }
    });

    router.beforePopState(({ options, url }) => {
      const currentLocale = options.locale as OneOfLanguage;

      const locale = localStorage.getItem("locale") ?? "ko";

      if (locale !== currentLocale) {
        const _url = url.replace("/en", "").replace("/jp", "");

        router.replace(_url, _url, { locale });

        return false;
      }

      return true;
    });
  });

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
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
