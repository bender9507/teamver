import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Button, SocialLoginButton } from "~/components/Commons";
import { useInsertProfileMutate } from "~/states/server/profile";
import { FlexColumn } from "~/styles/mixins";

const sampleProfile = {
  id: "be95f102-5344-43df-8561-f3f9208c0b3f",
  github: "jeonhaekang",
  name: "테스트 중",
  introduce: "안녕하세요 테스트 중입니다.",
  imageUrl:
    "https://knjzcsrhngnomfeoymis.supabase.co/storage/v1/object/public/profileImages/be95f102-5344-43df-8561-f3f9208c0b3f_1692799998562_4.png",
  skills: [1, 2, 4, 7, 15, 18],
  projectTypes: [2, 4],
  positions: [1, 2],
  personalities: [3, 4, 5],
  languages: [1, 5, 7, 8],
  jobs: [1, 2, 3],
  areas: [1, 2, 3, 4, 5]
};

export default function Home() {
  const { t } = useTranslation("common");

  const { mutate } = useInsertProfileMutate();

  return (
    <>
      <Head>
        <title>{t("코더")}</title>
      </Head>

      <FlexColumn>
        <SocialLoginButton provider="github" />

        <Button onClick={() => mutate(sampleProfile)}>ddd</Button>
      </FlexColumn>
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
