import type { User } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Navbar, TitleHeader } from "~/components/Shared";

import {
  profileKeys,
  selectFollows,
  selectProfile,
  useSelectProfileQuery
} from "~/states/server/profile";
import { projectsKey, selectFollowProjects } from "~/states/server/project";
import { LayoutContent, LayoutHeaderWithNav } from "~/styles/mixins";
import { requireAuthentication } from "~/utils";
import { LikeMemberContainer } from "./components/Member";
import { LikeOwnerContainer } from "./components/Owner";

const Like = () => {
  const user = useUser() as User;
  const { data: profile } = useSelectProfileQuery(user.id);
  const { t } = useTranslation("like");

  return (
    <LayoutHeaderWithNav>
      <TitleHeader title={t("찜 목록")} />

      <LayoutContent padding="22px" marginTop={27}>
        {profile.role.id === 1 ? <LikeOwnerContainer /> : <LikeMemberContainer />}
      </LayoutContent>

      <Navbar />
    </LayoutHeaderWithNav>
  );
};

export default Like;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    const profile = queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
      selectProfile(session.user.id)
    );

    const projects = queryClient.prefetchQuery(
      projectsKey.selectFollowProjects(session.user.id),
      () => selectFollowProjects(session.user.id)
    );

    const follows = queryClient.prefetchQuery(profileKeys.selectFollows(session.user.id), () =>
      selectFollows(session.user.id)
    );

    const followProjects = queryClient.prefetchQuery(
      projectsKey.selectFollowProjects(session.user.id),
      () => selectFollowProjects(session.user.id)
    );

    await Promise.all([profile, projects, follows, followProjects]);

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(context.locale as string, [
          "common",
          "like",
          "profile",
          "project"
        ]))
      }
    };
  }
);
