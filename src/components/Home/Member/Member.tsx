import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import {
  Button,
  Icon,
  IconButton,
  PROJECT_DETAIL_MODAL,
  ProjectDetail,
  SelectChip,
  TinderCard
} from "~/components/Commons";
import { CommonContainer, Flex, FlexColumn, Position, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import {
  BlurChip,
  CardContainer,
  Container,
  Content,
  Gradient,
  OptionButton,
  Profile,
  Select
} from "../Home.styles";
import { useMember } from "./Member.hooks";

export const Member = (props: { user: User }) => {
  const app = useMember(props);
  const { t, i18n } = useTranslation("home");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Container>
      <Select>
        <OptionButton
          isSelected={!!app.filter.projectType}
          onClick={() =>
            app.mount(
              <CommonContainer as="form" onSubmit={app.handleChangeFilter}>
                <FlexColumn gap={12}>
                  <Text size="titleMedium">{t("어떤 프로젝트를 찾으시나요")}</Text>
                  <Text size="paragraph3">{t("도전해보고 싶은 프로젝트 타입을 선택해주세요")}</Text>
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
              </CommonContainer>,
              { id: "selectProjectType", type: "bottom" }
            )
          }
        >
          {t("프로젝트 타입")}
          <Icon name="arrowDown" width={20} height={20} />
        </OptionButton>

        <OptionButton
          isSelected={app.filter.areas.length > 0}
          onClick={() =>
            app.mount(
              <CommonContainer as="form" onSubmit={app.handleChangeFilter}>
                <FlexColumn gap={12}>
                  <Text size="titleMedium">{t("프로젝트 활동 지역이 어디인가요")}</Text>

                  <Text size="paragraph3">
                    {t("주로 활동하는 지역을 선택해주세요 여러개 선택 가능해요")}
                  </Text>
                </FlexColumn>

                <SizeBox height={52} />

                <Flex gap={12} wrap="wrap">
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
                </Flex>

                <SizeBox height={60} />

                <Button>{t("확인")}</Button>
              </CommonContainer>,
              { id: "selectLanguages", type: "bottom" }
            )
          }
        >
          {t("활동 지역")}
          <Icon name="arrowDown" width={20} height={20} />
        </OptionButton>
      </Select>

      <Position position="relative">
        {app.filteredRandomProjects.map((project) => {
          return (
            <CardContainer key={project.id}>
              <TinderCard
                onConfirm={() => app.handleAccept(project.id)}
                onCancel={() => app.handleReject(project.id)}
                onRestore={app.handleRestore}
              >
                <Profile src={project.imageUrl} alt="프로필 사진" fill sizes="100%" priority />

                <Gradient />

                <Content>
                  <Flex>
                    <BlurChip>{project.projectType[currentLanguage]}</BlurChip>
                  </Flex>

                  <Text size="titleMedium">{project.name}</Text>

                  <Flex align="end" justify="between" gap={18}>
                    <Text size="textSmallBold" color="gray9" lineClamp={2}>
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
                </Content>
              </TinderCard>
            </CardContainer>
          );
        })}
      </Position>
    </Container>
  );
};
