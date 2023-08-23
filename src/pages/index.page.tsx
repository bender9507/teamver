import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { SocialLoginButton } from "~/components/Commons";
import { Text } from "~/styles/mixins";
import * as Styled from "./home.styles";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("코더")}</title>
      </Head>

      <Styled.Container>
        <Text>이용 약관</Text>

        <SocialLoginButton provider="github" />

        <Text>로그인이 안되나요?</Text>
      </Styled.Container>
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
