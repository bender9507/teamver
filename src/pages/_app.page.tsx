import { Global, ThemeProvider, css } from "@emotion/react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import { Noto_Sans_KR as NotoSansKR } from "next/font/google";
import { Overlay } from "~/components/Commons";
import { more, reset } from "~/styles/base";
import { theme } from "~/styles/theme";
import { useApp } from "./_app.hooks";
import * as Styled from "./_app.styles";
import type { AppPropsWithLayout } from "./_app.types";

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

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { supabaseClient } = useApp();

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
