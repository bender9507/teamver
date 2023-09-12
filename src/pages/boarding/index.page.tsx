import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Button } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { requireAuthentication } from "~/utils";
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
