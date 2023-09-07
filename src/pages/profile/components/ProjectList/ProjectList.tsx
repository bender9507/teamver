import { useTranslation } from "next-i18next";
import { FlexColumn, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { SectionContainer } from "../Profile.styles";
import { ProjectStatusUpdate } from "../ProjectCard/ProjectStatusUpdate";
import { useProjectList } from "./ProjectList.hooks";
import type { ProjectListProps } from "./ProjectList.types";

export const ProjectList = ({
  inProjects,
  doneProjects,
  selectedTab,
  isMine
}: ProjectListProps) => {
  const { t } = useTranslation("profile");

  const app = useProjectList(selectedTab, inProjects, doneProjects);

  return (
    <SectionContainer gap={12}>
      {app.isEmptyProjects ? (
        <FlexColumn align="center" style={{ marginTop: "98px" }}>
          <Text size="textMediumBold" color="gray6">
            {isEmpty(app.filteredProjects)
              ? t("완료된 프로젝트가 없어요")
              : t("진행 중인 프로젝트가 없어요")}
          </Text>
        </FlexColumn>
      ) : (
        app.filteredProjects.map((project) => (
          <ProjectStatusUpdate key={project.id} project={project} isMine={isMine} />
        ))
      )}
    </SectionContainer>
  );
};
