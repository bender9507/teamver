import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Button, Icon } from "~/components/Commons";
import { ProjectCard } from "~/components/MyPage";
import { getProjects, getReviews } from "~/states/server";
import { projectsKey } from "~/states/server/project/keys";
import { reviewsKey } from "~/states/server/review/keys";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useMyPage } from "./mypage.hooks";
import * as Styled from "./mypage.styles";

const USER_ID = "2191646e-7d68-4d1d-83a7-8b24eee4a856";

function MyPage() {
  const { t } = useTranslation("mypage");
  const app = useMyPage(USER_ID);

  return (
    <>
      <Head>
        <title>{t("마이페이지")}</title>
      </Head>

      <Styled.Container>
        <Avatar src="http://via.placeholder.com/250x250" size="large" />
        <Button>{t("포지션 수정")}</Button>

        <Styled.LikeUsersButtonContainer>
          <Text>{t("나를 찜한 사용자 n명")}</Text>
          <Link href="/mypage/like">
            <Icon name="close" />
          </Link>
        </Styled.LikeUsersButtonContainer>

        <Styled.ProceedingProjectContainer>
          <Text as="h3" size="heading3">
            {t("진행중인 프로젝트")}
          </Text>
          {app.proceedProjectList.map((project) => (
            <ProjectCard
              key={project.projects.id}
              projectState="proceed"
              project={project.projects}
            />
          ))}
        </Styled.ProceedingProjectContainer>

        <Styled.ReceivedRecommendContainer>
          <Text as="h3" size="heading3">
            {t("받은 추천")} {app.reviewCount}
          </Text>

          {app.reviews.map((review) => (
            <Styled.RecommendCard key={review.id}>
              <Flex gap={10}>
                <Avatar src="http://via.placeholder.com/250x250" size="medium" />
                <FlexColumn>
                  <Text>{review.reviewer.name}</Text>
                  <Text>{review.constantReactions.ko}</Text>
                </FlexColumn>
              </Flex>
              <Text>{review.comment}</Text>
            </Styled.RecommendCard>
          ))}
        </Styled.ReceivedRecommendContainer>

        <Styled.PreviousProjectContainer>
          <Text as="h3" size="heading3">
            {t("지난 프로젝트")}
          </Text>

          {app.doneProjectList.map((project) => (
            <ProjectCard
              key={project.projects.id}
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
    queryKey: projectsKey.getProjectsById(USER_ID),
    queryFn: () => getProjects(USER_ID)
  });
  await queryClient.prefetchQuery({
    queryKey: reviewsKey.getReviewsById(USER_ID),
    queryFn: () => getReviews(USER_ID)
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
