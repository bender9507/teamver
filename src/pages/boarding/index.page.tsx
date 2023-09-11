import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Button } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { selectProfile } from "~/states/server/profile";
import * as Styled from "./boarding.styles";
import BoardCarousel from "./components/Carousel/Carousel";

const Boarding = () => {
  const { t } = useTranslation("boarding");

  return (
    <Styled.Container>
      <BoardCarousel />
      <Styled.Gradient />
      <Link href={{ pathname: routes.home }}>
        <Styled.ButtonWrapper>
          <Button style={{ width: "91%" }}>{t("시작하기")}</Button>
        </Styled.ButtonWrapper>
      </Link>
    </Styled.Container>
  );
};

export default Boarding;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const { data: userData } = await supabaseServer.auth.getUser();

  const user = userData.user as User;

  const profile = await selectProfile(user.id);

  if (profile) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false
      }
    };
  }

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale as string, ["boarding"]))
    }
  };
};
