import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Icon, RadioChip, TinderCard } from "~/components/Commons";
import { MemberNavbarLayout } from "~/components/Layouts";
import { routes } from "~/constants/routes";
import { Flex, FlexColumn, Position, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useMember } from "./member.hooks";
import * as Styled from "./member.styles";

const Member = (props: { user: User }) => {
  const app = useMember(props);
  const { t, i18n } = useTranslation("memberHome");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <MemberNavbarLayout>
      <Styled.Container>
        <Flex>
          <Styled.TypeButton
            isSelected={!!app.selectedProjectType}
            onClick={() =>
              app.mount(
                <FlexColumn as="form" onSubmit={app.handleSubmit(app.handleChangeProjectType)}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">어떤 프로젝트를 찾으시나요?</Text>
                    <Text size="paragraph3">도전해보고 싶은 프로젝트 타입을 선택해주세요!</Text>
                  </FlexColumn>

                  <SizeBox height={50} />

                  <Flex gap={12} wrap="wrap">
                    <RadioChip {...app.register("projectType")} color="backgroundPrimary" value="">
                      전체
                    </RadioChip>

                    {app.constants.projectTypes.map((projectType) => (
                      <RadioChip
                        {...app.register("projectType")}
                        key={projectType.id}
                        color="backgroundPrimary"
                        value={projectType.id}
                      >
                        {projectType[currentLanguage]}
                      </RadioChip>
                    ))}
                  </Flex>

                  <SizeBox height={60} />

                  <Button>확인</Button>
                </FlexColumn>,
                { id: "selectProjectType", type: "bottom" }
              )
            }
          >
            프로젝트 타입
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>
        </Flex>

        <Position position="relative">
          {app.filteredRandomProjects.reverse().map((project) => (
            <Styled.CardContainer key={project.id}>
              <TinderCard
                onConfirm={() => app.handleConfirm(project.id)}
                onCancel={() => app.handleCancel(project.id)}
              >
                <Styled.Profile
                  src={project.imageUrl}
                  alt="프로필 사진"
                  fill
                  sizes="100%"
                  priority
                />

                <Styled.Gradient />

                <Styled.Content>
                  <FlexColumn gap={12}>
                    <Flex>
                      <Styled.BlurChip>{project.projectType[currentLanguage]}</Styled.BlurChip>
                    </Flex>

                    <Text size="heading4">{project.name}</Text>

                    <Text size="paragraph3" color="gray1">
                      {project.description}
                    </Text>
                  </FlexColumn>
                </Styled.Content>
              </TinderCard>
            </Styled.CardContainer>
          ))}
        </Position>
      </Styled.Container>
    </MemberNavbarLayout>
  );
};

export default Member;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { session }
  } = await supabaseServer.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session.user,
      ...(await serverSideTranslations(context.locale, ["welcome"]))
    }
  };
};
