import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Button,
  Icon,
  IconButton,
  PROJECT_DETAIL_MODAL,
  ProjectDetail,
  SelectChip,
  TinderCard
} from "~/components/Commons";
import { MemberNavbarLayout } from "~/components/Layouts";
import { routes } from "~/constants/routes";
import { Flex, FlexColumn, Grid, Position, SizeBox, Text } from "~/styles/mixins";
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
        <Flex gap={12}>
          <Button onClick={app.handleRestore}>복원</Button>

          <Styled.TypeButton
            isSelected={!!app.filter.projectType}
            onClick={() =>
              app.mount(
                <Styled.FilterContainer as="form" onSubmit={app.handleChangeFilter}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">{t("어떤 프로젝트를 찾으시나요")}</Text>
                    <Text size="paragraph3">
                      {t("도전해보고 싶은 프로젝트 타입을 선택해주세요")}
                    </Text>
                  </FlexColumn>

                  <SizeBox height={50} />

                  <Flex gap={12} wrap="wrap">
                    {app.constants.projectTypes.map((projectType) => (
                      <SelectChip
                        key={projectType.id}
                        type="radio"
                        value={projectType.id}
                        color="backgroundPrimary"
                        {...app.register("projectType")}
                      >
                        {projectType[currentLanguage]}
                      </SelectChip>
                    ))}
                  </Flex>

                  <SizeBox height={60} />

                  <Button>{t("확인")}</Button>
                </Styled.FilterContainer>,
                { id: "selectProjectType", type: "bottom" }
              )
            }
          >
            {t("프로젝트 타입")}
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>

          <Styled.TypeButton
            isSelected={app.filter.areas.length > 0}
            onClick={() =>
              app.mount(
                <Styled.FilterContainer as="form" onSubmit={app.handleChangeFilter}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">{t("프로젝트 활동 지역이 어디인가요")}</Text>

                    <Text size="paragraph3">
                      {t("주로 활동하는 지역을 선택해주세요 여러개 선택 가능해요")}
                    </Text>
                  </FlexColumn>

                  <SizeBox height={52} />

                  <Grid gap={12} column={5}>
                    {app.constants.areas.map((area) => (
                      <SelectChip
                        key={area.id}
                        value={area.id}
                        color="backgroundPrimary"
                        {...app.register("areas")}
                      >
                        {area[currentLanguage]}
                      </SelectChip>
                    ))}
                  </Grid>

                  <SizeBox height={60} />

                  <Button>확인</Button>
                </Styled.FilterContainer>,
                { id: "selectLanguages", type: "bottom" }
              )
            }
          >
            {t("활동 지역")}
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>
        </Flex>

        <Position position="relative">
          {app.filteredRandomProjects.map((project) => {
            return (
              <Styled.CardContainer key={project.id}>
                <TinderCard
                  onConfirm={() => app.handleAccept(project.id)}
                  onCancel={() => app.handleReject(project.id)}
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

                      <Flex align="end" justify="between" gap={18}>
                        <Text size="paragraph3" color="gray1" lineClamp={2}>
                          {project.description}
                        </Text>

                        <IconButton
                          name="upButton"
                          width={26}
                          height={26}
                          color="white"
                          onClick={() =>
                            app.mount(<ProjectDetail project={project} profile={app.profile} />, {
                              id: PROJECT_DETAIL_MODAL,
                              type: "bottom"
                            })
                          }
                          style={{ flexShrink: 0 }}
                        />
                      </Flex>
                    </FlexColumn>
                  </Styled.Content>
                </TinderCard>
              </Styled.CardContainer>
            );
          })}
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
      ...(await serverSideTranslations(context.locale, ["memberHome"]))
    }
  };
};
