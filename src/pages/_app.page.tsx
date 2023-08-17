import { Global, ThemeProvider, css } from "@emotion/react";
import type { DehydratedState } from "@tanstack/react-query";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Noto_Sans_KR as NotoSansKR } from "next/font/google";
import { Overlay } from "~/components/Commons";
import { more, reset } from "~/styles/base";
import { lightTheme } from "~/styles/theme";
import { useApp } from "./_app.hooks";

const notoSansKR = NotoSansKR({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) => {
  useApp();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={lightTheme}>
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
          <Component {...pageProps} />
          <Overlay />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
