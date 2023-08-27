declare module "next" {
  export type GetServerSidePropsContext<
    Params extends ParsedUrlQuery = ParsedUrlQuery,
    Preview extends PreviewData = PreviewData
  > = {
    req: IncomingMessage & {
      cookies: NextApiRequestCookies;
    };
    res: ServerResponse;
    params?: Params;
    query: ParsedUrlQuery;
    preview?: boolean;
    previewData?: Preview;
    draftMode?: boolean;
    resolvedUrl: string;
    locale: "en" | "ko" | "jp";
    locales?: string[];
    defaultLocale?: string;
  };

  export type GetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  > = (context: GetServerSidePropsContext<Q, D>) => Promise<GetServerSidePropsResult<P>>;
}
