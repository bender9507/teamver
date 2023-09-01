import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IconButton } from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { Flex, FlexColumn } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useRole } from "./role.hooks";
import * as Styled from "./role.styles";

const Role = ({ user }: { user: User }) => {
  const { t } = useTranslation("setting");

  const app = useRole(user.id);

  return (
    <>
      <TitleHeader title={t("참여 모드 설정")} />

      <FlexColumn>
        <Flex align="center" justify="between" onClick={app.handleClickParticipantMode}>
          <Styled.Option>{t("프로젝트 참가자 모드")}</Styled.Option>

          <IconButton name="setOff" />
        </Flex>

        <Flex align="center" justify="between" onClick={app.handleClickRecruiterMode}>
          <Styled.Option>{t("프로젝트 모집자 모드")}</Styled.Option>

          <IconButton name="setOff" />
        </Flex>
      </FlexColumn>
    </>
  );
};

export default Role;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient<Database>(ctx);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(ctx.locale, ["setting"]))
    }
  };
};
