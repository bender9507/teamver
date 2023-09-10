import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TitleHeader } from "~/components/Shared";
import { noticeKeys, selectNoticeMember, selectNoticeOwner } from "~/states/server/notice";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
import { LayoutContent, LayoutHeader } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { NoticeList } from "./components";

const Notice = () => {
  const user = useUser() as User;
  const { t } = useTranslation("notice");
  const { data: profile } = useSelectProfileQuery(user.id);

  return (
    <LayoutHeader>
      <TitleHeader title={t("알림")} />

      <LayoutContent marginTop={27}>
        <NoticeList role={profile.role.id} />
      </LayoutContent>
    </LayoutHeader>
  );
};

export default Notice;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    const profile = queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
      selectProfile(session.user.id)
    );
    const noticeMember = queryClient.prefetchQuery(
      noticeKeys.selectNoticeMember(session.user.id),
      () => selectNoticeMember(session.user.id)
    );
    const noticeOwner = queryClient.prefetchQuery(
      noticeKeys.selectNoticeOwner(session.user.id),
      () => selectNoticeOwner(session.user.id)
    );

    await Promise.all([profile, noticeMember, noticeOwner]);

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(context.locale as string, ["notice"]))
      }
    };
  }
);
