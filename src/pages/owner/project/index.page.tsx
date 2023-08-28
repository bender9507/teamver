import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { Avatar, Button, Icon, PreviousButton } from "~/components/Commons";
import { Card } from "~/components/OwnerProject/Card";
import { Flex, FlexColumn, SizeBox, Text } from "~/styles/mixins";
import { useProject } from "./project.hooks";
import * as Styled from "./project.styles";

const Project = ({ user }: { user: User }) => {
  const app = useProject(user.id);

  return (
    <>
      <Styled.Header>
        <PreviousButton />
      </Styled.Header>
      <FlexColumn align="center">
        <SizeBox height={62} />
        <Styled.ProfileBox>
          <Avatar src={app.profile.imageUrl} size="large" />
          <Text>{app.profile.name}</Text>
          <Button>프로필 수정</Button>
        </Styled.ProfileBox>
        <SizeBox height={46} />
      </FlexColumn>
      <Styled.ProjectContainer>
        <Flex wrap="wrap">
          <Styled.Category>
            <Text size="heading5" onClick={() => app.setSelectedCategory("IN_PROGRESS")}>
              진행 중인 프로젝트
            </Text>
          </Styled.Category>
          <Styled.Category>
            <Text size="heading5" onClick={() => app.setSelectedCategory("DONE_PROJECT")}>
              완료된 프로젝트
            </Text>
          </Styled.Category>
        </Flex>
        {app.selectedCategory === "IN_PROGRESS" && (
          <Styled.ProjectBox gap={26}>
            <FlexColumn gap={26}>
              <Text size="heading4">모집 중인 프로젝트</Text>
              <FlexColumn gap={26}>
                {app.projects
                  .filter((project) => project.state === "IN_RECRUIT")
                  .map((project) => (
                    <Card key={project.id} {...project} />
                  ))}
              </FlexColumn>
            </FlexColumn>
            <FlexColumn gap={26}>
              <Text size="heading4" style={{ paddingTop: 28 }}>
                모집 완료된 프로젝트
              </Text>
              <FlexColumn gap={26}>
                {app.projects
                  .filter((project) => project.state === "DONE_RECRUIT")
                  .map((project) => (
                    <Card key={project.id} {...project} />
                  ))}
              </FlexColumn>
            </FlexColumn>
          </Styled.ProjectBox>
        )}
        {app.selectedCategory === "DONE_PROJECT" && (
          <>
            <SizeBox height={14} />
            <Styled.ProjectBox gap={26}>
              <FlexColumn gap={16}>
                {app.projects
                  .filter((project) => project.state === "DONE_PROJECT")
                  .map((project) => (
                    <Card key={project.id} {...project} />
                  ))}
              </FlexColumn>
            </Styled.ProjectBox>
          </>
        )}
        <Link href="/owner/project/create">
          <Styled.ImageUploadButton>
            <Icon name="add" color="gray3" width={28} height={28} />
          </Styled.ImageUploadButton>
        </Link>
      </Styled.ProjectContainer>
    </>
  );
};

export default Project;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { session }
  } = await supabaseServer.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session.user,

      ...(await serverSideTranslations(context.locale, ["common", "home"]))
    }
  };
};
