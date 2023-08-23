import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { Avatar, PreviousButton } from "~/components/Commons";
import { getProjectMembers } from "~/states/server";
import { projectsKey } from "~/states/server/project/keys";
import { Text } from "~/styles/mixins";
import { useProjectMembers } from "./projectmembers.hooks";
import * as Styled from "./projectmembers.styles";

function ProjectMembers() {
  const { t } = useTranslation("projects");
  const app = useProjectMembers();
  return (
    <>
      <Head>
        <title>{t("멤버")}</title>
      </Head>

      <Styled.Container>
        <Styled.TitleContainer>
          <PreviousButton />
          <Text as="h2" size="paragraph1">
            {t("프로젝트 멤버")}
          </Text>
        </Styled.TitleContainer>

        <Styled.MemberCardContainer>
          {app.projectMembers.map((member) => (
            <Styled.MemberCard key={member.members.id}>
              <Avatar src="http://via.placeholder.com/250x250" size="medium" />
              <Text>{member.members.name}</Text>
            </Styled.MemberCard>
          ))}
        </Styled.MemberCardContainer>
      </Styled.Container>
    </>
  );
}

export default ProjectMembers;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();

  const projectId = query.projectId as string;

  await queryClient.prefetchQuery({
    queryKey: projectsKey.getProjectMembersById(projectId),
    queryFn: () => getProjectMembers(projectId)
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};
