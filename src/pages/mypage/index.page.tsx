import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Avatar, Button } from "~/components/Commons";
import { ProjectCard } from "~/components/MyPage";
import { profileKeys, selectProfile } from "~/states/server/profile";
import { projectsKey, selectMemberProjects } from "~/states/server/project";
import { Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import { useMyPage } from "./mypage.hooks";
import * as Styled from "./mypage.styles";

export interface MyPageProps {
  userId: string;
}

function MyPage({ userId }: MyPageProps) {
  const { t } = useTranslation("mypage");

  const app = useMyPage(userId);

  return (
    <>
      <Head>
        <title>{t("마이페이지")}</title>
      </Head>

      <Styled.Container>
        <Avatar src={app.user.imageUrl} size="large" />
        <Text as="h2" size="heading3">
          {app.user.name}
        </Text>

        <Button>{t("포지션 수정")}</Button>

        <Styled.ProceedingProjectContainer>
          <Text as="h3" size="heading3">
            {t("진행중인 프로젝트")}
          </Text>

          {app.proceedProjects.map((project) => (
            <ProjectCard key={project.id} projectState="proceed" project={project} />
          ))}
        </Styled.ProceedingProjectContainer>

        <Styled.PreviousProjectContainer>
          <Text as="h3" size="heading3">
            {t("지난 프로젝트")}
          </Text>

          {app.doneProjects.map((project) => (
            <ProjectCard key={project.id} projectState="previous" project={project} />
          ))}
        </Styled.PreviousProjectContainer>
      </Styled.Container>
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
