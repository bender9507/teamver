import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TitleHeader } from "~/components/Shared";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { NoticeMember } from "./components/NoticeMember/NoticeMember";
import { NoticeOwner } from "./components/NoticeOwner/NoticeOwner";

const Notice = () => {
  const user = useUser() as User;
  const { t } = useTranslation("notice");
  const { data: profile } = useSelectProfileQuery(user.id);

  return (
    <LayoutHeader>
      <TitleHeader title={t("받은 알림 목록")} />

      <LayoutContent>{profile.role.id === 1 ? <NoticeOwner /> : <NoticeMember />}</LayoutContent>
    </LayoutHeader>
  );
};

export default Notice;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
      selectProfile(session.user.id)
    );

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(context.locale as string, ["notice"]))
      }
    };
  }
);
