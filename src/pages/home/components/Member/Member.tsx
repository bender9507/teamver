import { useTranslation } from "next-i18next";
import {
  Icon,
  IconButton,
  PROJECT_DETAIL_MODAL,
  ProjectDetail,
  TinderCard
} from "~/components/Commons";
import { Flex, Position, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { FILTER_AREA_MODAL, FILTER_TYPE_MODAL, FilterArea, FilterType } from "../Filters";
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

export const Member = () => {
  const app = useMember();
  const { t, i18n } = useTranslation("home");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Container>
      <Select>
        <OptionButton
          isSelected={!!app.filter.projectType}
          onClick={() =>
            app.mount(
              <FilterType
                selectedType={app.filter.projectType}
                onSubmit={(type) => app.handleChangeFilter("projectType", type)}
              />,
              { id: FILTER_TYPE_MODAL, type: "bottom" }
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
              <FilterArea
                selectedAreas={app.filter.areas}
                onSubmit={(areas) => app.handleChangeFilter("areas", areas)}
              />,
              { id: FILTER_AREA_MODAL, type: "bottom" }
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
