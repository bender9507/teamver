import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { SocialLoginButton } from "~/components/Commons";
import { projectsKey, selectProject, useSelectProjectQuery } from "~/states/server/project";

const PROJECT_ID = "41";

export default function Home() {
  const { t } = useTranslation("common");
  const { data } = useSelectProjectQuery(PROJECT_ID);

  console.log(data);
  return (
    <>
      <Head>
        <title>{t("코더")}</title>
      </Head>
      <SocialLoginButton provider="github" />
      coder
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectProject(PROJECT_ID),
    queryFn: () => selectProject(PROJECT_ID)
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
};
