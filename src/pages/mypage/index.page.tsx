import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Button, Tab } from "~/components/Commons";
import { MemberNavbarLayout } from "~/components/Layouts";
import { ProjectCard } from "~/components/MyPage";
import { profileKeys, selectProfile } from "~/states/server/profile";
import { projectsKey, selectMemberProjects } from "~/states/server/project";
import { FlexColumn, SizeBox, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useMyPage } from "./mypage.hooks";
import * as Styled from "./mypage.styles";
import type { MyPageProps } from "./mypage.types";

function MyPage({ userId }: MyPageProps) {
  const { t } = useTranslation("mypage");

  const app = useMyPage(userId);

  return (
    <>
      <Head>
        <title>{t("마이페이지")}</title>
      </Head>
      <MemberNavbarLayout>
        <FlexColumn>
          <FlexColumn align="center">
            <SizeBox height={62} />

            <FlexColumn gap={12} align="center">
              <Avatar src={app.user.imageUrl} size="large" />

              <Text>{app.user.name}</Text>

              <Link href="/mypage/profile/edit">
                <Button>{t("프로필 수정")}</Button>
              </Link>
            </FlexColumn>

            <SizeBox height={46} />
          </FlexColumn>

          <Tab
            items={[
              { id: "IN_PROGRESS", label: "진행 중인 프로젝트" },
              { id: "DONE_PROJECT", label: "완료된 프로젝트" }
            ]}
            selectedItem={app.selectedCategory}
            onClick={app.setSelectedCategory}
          />

          {app.selectedCategory === "IN_PROGRESS" && (
            <Styled.ProjectContainer>
              {app.proceedProjects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </Styled.ProjectContainer>
          )}

          {app.selectedCategory === "DONE_PROJECT" && (
            <Styled.ProjectContainer>
              {app.doneProjects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </Styled.ProjectContainer>
          )}
        </FlexColumn>
      </MemberNavbarLayout>
    </>
  );
}

export default MyPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const supabaseClient = createPagesServerClient<Database>(ctx);

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  await queryClient.prefetchQuery({
    queryKey: projectsKey.selectMemberProjects(session.user.id),
    queryFn: () => selectMemberProjects(session.user.id)
  });
  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(session.user.id),
    queryFn: () => selectProfile(session.user.id)
  });

  return {
    props: {
      userId: session.user.id,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale, ["mypage"]))
    }
  };
};
