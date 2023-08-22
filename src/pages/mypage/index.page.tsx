import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { Button, Icon } from "~/components/Commons";
import { ProjectCard } from "~/components/MyPage";
import { getProjects } from "~/states/server/project/apis";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useMyPage } from "./mypage.hooks";
import * as Styled from "./mypage.styles";

const USER_ID = "67dd1056-0980-4895-b32f-37680aa3f2ca";

function MyPage() {
  const { t } = useTranslation("mypage");
  const app = useMyPage(USER_ID);
  return (
    <>
      <Head>
        <title>{t("마이페이지")}</title>
      </Head>

      <Styled.Container>
        <Text>big size Avatar</Text>
        <Button>{t("포지션 수정")}</Button>
        <Styled.LikeUsersButtonContainer>
          <Text>나를 찜한 사용자 n명</Text>
          <Link href="/mypage/like">
            <Icon name="close" />
          </Link>
        </Styled.LikeUsersButtonContainer>
        <Styled.ProceedingProjectContainer>
          <Text as="h3" size="heading3">
            진행중인 프로젝트
          </Text>

          {app.ProceedProjectList.map((project) => (
            <ProjectCard
              key={project.projects?.id}
              projectState="proceed"
              project={project.projects}
            />
          ))}
        </Styled.ProceedingProjectContainer>
        <Styled.ReceivedRecommendContainer>
          <Text as="h3" size="heading3">
            받은 추천 n
          </Text>
          <Styled.RecommendCard>
            <Flex gap={10}>
              <Text>middle size Avatar</Text>
              <FlexColumn>
                <Text>오너아이디</Text>
                <Text>프로젝트 참여</Text>
              </FlexColumn>
            </Flex>
            <Text>gdgdgdgdgd</Text>
          </Styled.RecommendCard>
        </Styled.ReceivedRecommendContainer>
        <Styled.PreviousProjectContainer>
          <Text as="h3" size="heading3">
            지난 프로젝트
          </Text>
          {app.DoneProjectList.map((project) => (
            <ProjectCard
              key={project.projects?.id}
              projectState="previous"
              project={project.projects}
            />
          ))}
        </Styled.PreviousProjectContainer>
      </Styled.Container>
    </>
  );
}

export default MyPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects", USER_ID],
    queryFn: () => getProjects(USER_ID)
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
