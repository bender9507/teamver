import { useTranslation } from "next-i18next";
import { FlexColumn, Text } from "~/styles/mixins";
import { ProjectStatusUpdate } from "../ProjectStatusUpdate";
import { useProjectCardBox } from "./ProjectCardBox.hooks";
import type { ProjectCardBoxProps } from "./ProjectCardBox.types";

export const ProjectCardBox = ({ projects, titleKey }: ProjectCardBoxProps) => {
  const { t } = useTranslation("profile");
  const app = useProjectCardBox();

  return (
    <FlexColumn gap={18}>
      <Text size="titleSmall">{t(titleKey)}</Text>
      <FlexColumn gap={12}>
        {projects.map((project) => (
          <ProjectStatusUpdate key={project.id} project={project} isMine={app.isMine} />
        ))}
      </FlexColumn>
    </FlexColumn>
  );
};
