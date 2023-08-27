import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { SocialLoginButton } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { Text } from "~/styles/mixins";
import type { Database } from "~/types/database";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("코더")}</title>
      </Head>

      <Text>corder</Text>

      <SocialLoginButton provider="github" />
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
      if (profile.role === 1) {
        return {
          redirect: {
            destination: routes.owner,
            permanent: false
          }
        };
      }
      return {
        redirect: {
          destination: routes.member,
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
      ...(await serverSideTranslations(ctx.locale, ["common"]))
    }
  };
};
