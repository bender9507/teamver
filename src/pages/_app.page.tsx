import { Global, ThemeProvider, css } from "@emotion/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { DehydratedState } from "@tanstack/react-query";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Noto_Sans_KR as NotoSansKR } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMount } from "react-use";
import { Overlay } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { supabase } from "~/states/server/config";
import { more, reset } from "~/styles/base";
import { theme } from "~/styles/theme";
import * as Styled from "./_app.styles";

const notoSansKR = NotoSansKR({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  }
});

const App = ({
  Component,
  pageProps
}: AppProps<{ dehydratedState: DehydratedState; initialSession: Session }>) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  const router = useRouter();

  useMount(() => {
    supabase.auth.onAuthStateChange((state) => {
      if (state === "SIGNED_IN") {
        router.push(routes.home);
      }
    });
  });

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Global
              styles={css`
                ${reset}
                ${more}
              body,
              button,
              input,
              textarea {
                  font-family: ${notoSansKR.style.fontFamily};
                }
              `}
            />
            <Styled.Container>
              <Styled.Content>
                <Component {...pageProps} />
              </Styled.Content>

              <Overlay />
            </Styled.Container>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default appWithTranslation(App);
