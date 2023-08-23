import { Button } from "~/components/Commons";
import type { ProjectsRow } from "~/states/server/project/types";
import { Flex, Text } from "~/styles/mixins";
import * as Styled from "./ProjectCard.styles";

interface ProjectCardProps {
  projectState: "proceed" | "previous";
  project: ProjectsRow;
}

export const ProjectCard = ({ projectState, project }: ProjectCardProps) => {
  return (
    <Styled.ProjectCard>
      <Text>{project.name}</Text>
      {projectState === "proceed" ? (
        <Flex gap={5}>
          <Button onClick={() => console.log(project)}>정보</Button>
          <Button>멤버</Button>
        </Flex>
      ) : (
        <Button onClick={() => console.log(project)}>멤버 후기 쓰기</Button>
      )}
    </Styled.ProjectCard>
  );
};
