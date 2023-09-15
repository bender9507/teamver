import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { MetaTag } from "~/components/Shared/MetaTag";
import { routes } from "~/constants/routes";
import { requireAuthentication } from "~/utils";
import * as Styled from "./boarding.styles";
import BoardCarousel from "./components/Carousel/Carousel";

const Boarding = () => {
  const { t } = useTranslation("boarding");

  const router = useRouter();

  const previousRoute = router.query.previousRoute as string;

  return (
    <Styled.Container>
      <MetaTag title="팀버 사용 가이드" name="description" content="팀버 사용 가이드" />

      {previousRoute === "/setting" && <TitleHeader title={t("사용 가이드")} />}
      <BoardCarousel />
      <Styled.Gradient />
      {previousRoute !== "/setting" && (
        <Link href={{ pathname: routes.home }}>
          <Styled.ButtonWrapper>
            <Button style={{ width: "91%" }}>{t("시작하기")}</Button>
          </Styled.ButtonWrapper>
        </Link>
      )}
    </Styled.Container>
  );
};

export default Boarding;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, ["boarding"]))
      }
    };
  }
);
