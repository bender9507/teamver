import { useTranslation } from "next-i18next";
import { Icon, TinderCard } from "~/components/Commons";
import { PosCenter, Position, Text } from "~/styles/mixins";
import { FILTER_AREA_MODAL, FILTER_TYPE_MODAL, FilterArea, FilterType } from "../Filters";
import { CardContainer, Container, OptionButton, Select } from "../Home.styles";
import { useMember } from "./Member.hooks";
import { ProjectCard } from "./ProjectCard";

export const Member = () => {
  const app = useMember();
  const { t } = useTranslation("home");

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
        <CardContainer>
          <TinderCard mode="inactive" onRestore={app.handleRestore}>
            <PosCenter>
              <Text size="textMediumBold" color="gray6">
                {t("등록된 프로젝트가 없어요")}
              </Text>
            </PosCenter>
          </TinderCard>
        </CardContainer>

        {app.filteredRandomProjects.map((project, idx, row) => (
          <ProjectCard
            key={project.id}
            onAccept={() => app.handleAccept(project.id)}
            onReject={() => app.handleReject(project.id)}
            onRestore={app.handleRestore}
            project={project}
            isFirst={idx + 1 === row.length}
          />
        ))}
      </Position>
    </Container>
  );
};
