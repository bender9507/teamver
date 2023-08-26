import Link from "next/link";
import { Button } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { Flex, Text } from "~/styles/mixins";
import { ProjectDetail } from "../ProjectDetail";
import * as Styled from "./ProjectCard.styles";
import type { ProjectCardProps } from "./ProjectCard.types";

export const ProjectCard = ({ projectState, project }: ProjectCardProps) => {
  const { mount } = useModal();
  console.log(project);
  return (
    <Styled.ProjectCard>
      <Text>{project.name}</Text>

      {projectState === "proceed" && (
        <Flex gap={5}>
          <Button
            onClick={() =>
              mount(<ProjectDetail project={project} />, { id: "projects", type: "bottom" })
            }
          >
            정보
          </Button>
          <Button>
            <Link href={`/project/${project.id}`}>멤버</Link>
          </Button>
        </Flex>
      )}
    </Styled.ProjectCard>
  );
};
