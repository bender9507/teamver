import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { SocialLoginButton } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { selectProfile } from "~/states/server/profile";
import { FlexCenter, PosCenter, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import * as Styled from "./Home.styles";

export default function Home() {
  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <title>{t("팀버")}</title>
      </Head>

      <Styled.Container>
        <PosCenter>
          <FlexCenter direction="column" gap={20}>
            <Image src="/images/teamver.png" width={112} height={41} alt="teamver logo" />

            <Text size="textLarge">개발자 팀원을 찾을 땐</Text>
          </FlexCenter>
        </PosCenter>

        <SocialLoginButton provider="github" />
      </Styled.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    const profile = await selectProfile(session.user.id);

    if (profile) {
      return {
        redirect: {
          destination: routes.main,
          statusCode: 302
        }
      };
    }

    return {
      redirect: {
        destination: routes.welcome,
        statusCode: 302
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ["common"]))
    }
  };
};
