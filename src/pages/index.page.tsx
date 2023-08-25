import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Button, SocialLoginButton } from "~/components/Commons";
import { useInsertFollowProjectMutate } from "~/states/server/project/mutations";

const sampleData = {
  followerId: "8a9345fc-bd2c-43a1-8868-99e2c5ed5afe",
  projectId: 43
};

export default function Home() {
  const { t } = useTranslation("common");

  const { mutate } = useInsertFollowProjectMutate();

  return (
    <>
      <Head>
        <title>{t("코더")}</title>
      </Head>
      <SocialLoginButton provider="github" />
      <Button onClick={() => mutate(sampleData)}>찜</Button>
      coder
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
    }
  };
};
