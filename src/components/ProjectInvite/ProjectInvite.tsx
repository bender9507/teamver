import { useState } from "react";
import type { ProjectAllDataRow } from "~/states/server/project";
import { Text } from "~/styles/mixins";
import { Avatar, Icon } from "../Commons";
import { useProjectInvite } from "./ProjectInvite.hooks";
import * as Styled from "./ProjectInvite.styles";

export const ProjectInvite = ({
  ownerId,
  onProjectSelect
}: {
  ownerId: string;
  onProjectSelect: (projectId: number) => void;
}) => {
  const [localSelectedProjectId, setLocalSelectedProjectId] = useState<number | null>(null);

  const app = useProjectInvite(ownerId);

  const handleProjectSelect = (project: ProjectAllDataRow) => {
    setLocalSelectedProjectId(project.id);
    onProjectSelect(project.id);
  };

  return (
    <Styled.ProjectListWrapper>
      {app.projects.map((project) => (
        <Styled.ProjectListBox key={project.id} onClick={() => handleProjectSelect(project)}>
          <Icon
            name="success"
            color={localSelectedProjectId === project.id ? "tertiary" : "gray2"}
          />

          <Avatar src={project.imageUrl} size="small" />

          <Text color="gray5">{project.name}</Text>
        </Styled.ProjectListBox>
      ))}
    </Styled.ProjectListWrapper>
  );
};
