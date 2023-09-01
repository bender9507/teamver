import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IconButton } from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { profileKeys, selectProfile } from "~/states/server/profile";
import { Flex, FlexColumn, LayoutContent, LayoutHeader } from "~/styles/mixins";
import type { Database } from "~/types/database";
import * as Styled from "../setting.styles";
import { useRole } from "./role.hooks";

const Role = ({ user }: { user: User }) => {
  const { t } = useTranslation("setting");

  const app = useRole(user.id);

  return (
    <LayoutHeader>
      <TitleHeader title={t("참여 모드 설정")} />

      <LayoutContent>
        <FlexColumn>
          <Flex align="center" justify="between" onClick={app.handleClickParticipantMode}>
            <Styled.Option>{t("프로젝트 참가자 모드")}</Styled.Option>

            <IconButton name={app.profile.role.id === 2 ? "setOn" : "setOff"} />
          </Flex>

          <Flex align="center" justify="between" onClick={app.handleClickRecruiterMode}>
            <Styled.Option>{t("프로젝트 모집자 모드")}</Styled.Option>

            <IconButton name={app.profile.role.id === 1 ? "setOn" : "setOff"} />
          </Flex>
        </FlexColumn>
      </LayoutContent>
    </LayoutHeader>
  );
};

export default Role;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseClient = createPagesServerClient<Database>(ctx);
  const queryClient = new QueryClient();

  const { data } = await supabaseClient.auth.getUser();
  const user = data.user as User;

  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(user.id),
    queryFn: () => selectProfile(user.id)
  });

  return {
    props: {
      user,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["setting"]))
    }
  };
};
