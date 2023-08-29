import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { Avatar, Button, Tab } from "~/components/Commons";
import { Card } from "~/components/OwnerProject/Card";
import { FlexColumn, SizeBox, Text } from "~/styles/mixins";
import { useProject } from "./project.hooks";
import * as Styled from "./project.styles";

const Project = ({ user }: { user: User }) => {
  const { t } = useTranslation("ownerpage");

  const app = useProject(user.id);

  return (
    <>
      <Head>
        <title>{t("오너페이지")}</title>
      </Head>
      {/* <OwnerNavbarLayout> */}
      <FlexColumn>
        <FlexColumn align="center">
          <SizeBox height={62} />
          <Styled.ProfileBox>
            <Avatar src={app.profile.imageUrl} size="large" />
            <Text>{app.profile.name}</Text>
            <Link href="/mypage/profile/edit">
              <Button>{t("프로필 수정")}</Button>
            </Link>
          </Styled.ProfileBox>
          <SizeBox height={46} />
        </FlexColumn>
        <FlexColumn>
          <Tab
            items={[
              { id: "IN_PROGRESS", label: "진행 중인 프로젝트" },
              { id: "DONE_PROJECT", label: "완료된 프로젝트" }
            ]}
            selectedItem={app.selectedCategory}
            onClick={app.setSelectedCategory}
          />

          {app.selectedCategory === "IN_PROGRESS" && (
            // <Animation mode="in" delay={1000} start={{ opacity: 0 }} end={{ opacity: 1 }}>
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
            // </Animation>
          )}

          {app.selectedCategory === "DONE_PROJECT" && (
            // <Animation mode="in" delay={1000} start={{ opacity: 0 }} end={{ opacity: 1 }}>
            <Styled.ProjectBox gap={26}>
              <FlexColumn gap={16}>
                {app.projects
                  .filter((project) => project.state === "DONE_PROJECT")
                  .map((project) => (
                    <Card key={project.id} {...project} />
                  ))}
              </FlexColumn>
            </Styled.ProjectBox>
            // </Animation>
          )}

          {/* <Styled.SectionDisplay>
              <Styled.SectionContainer isInProgressSelected={app.isInProgressSelected}>
                <Styled.Section>
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
                </Styled.Section>
                <Styled.Section>
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
                </Styled.Section>
              </Styled.SectionContainer>
              <Link href="/owner/project/create">
                <Styled.ImageUploadButton>
                  <Icon name="add" color="gray3" width={28} height={28} />
                </Styled.ImageUploadButton>
              </Link>
            </Styled.SectionDisplay> */}
        </FlexColumn>
      </FlexColumn>
      {/* </OwnerNavbarLayout> */}
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
