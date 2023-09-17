import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { TitleHeader } from "~/components/Shared";
import { MetaTag } from "~/components/Shared/MetaTag";
import { noticeKeys, selectNoticeMember, selectNoticeOwner } from "~/states/server/notice";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
import { LayoutHeader } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { NoticeList } from "./components";
import * as Styled from "./notice.styles";

const Notice = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const user = useUser() as User;
  const { t } = useTranslation("notice");
  const { data: profile } = useSelectProfileQuery(user.id);

  return (
    <LayoutHeader>
      <MetaTag title="팀버 알림" name="description" content="팀버 알림" />

      <TitleHeader
        title={t("알림")}
        onDelete={() => setIsDelete((prev) => !prev)}
        state={!!isDelete}
      />

      <Styled.NoticeLayoutContent>
        <NoticeList role={profile.role.id} isDelete={isDelete} />
      </Styled.NoticeLayoutContent>
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
