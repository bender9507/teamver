import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { SocialLoginButton } from "~/components/Commons";
import { routes } from "~/constants/routes";
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
          <FlexCenter direction="column" gap={9}>
            <Text size="titleMedium">개발자 팀원을 찾을 땐,</Text>

            <Image src="/images/teamver.svg" width={208} height={45} alt="teamver logo" />
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
    const { data: profile } = await supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .maybeSingle();

    if (profile) {
      return {
        redirect: {
          destination: routes.main,
          permanent: false
        }
      };
    }

    return {
      redirect: {
        destination: routes.welcome,
        permanent: false
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ["common"]))
    }
  };
};
