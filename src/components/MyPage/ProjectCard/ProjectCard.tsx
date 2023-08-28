import Link from "next/link";
import { Avatar, Button } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "./ProjectCard.styles";
import type { ProjectCardProps } from "./ProjectCard.types";

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { mount } = useModal();
  return (
    <Styled.ProjectCard>
      <Avatar src={project.imageUrl} size="medium" />
      <FlexColumn gap={10}>
        <Text>{project.name}</Text>

        <Button>
          <Link href={`/project/${project.id}`}>팀원 보기</Link>
        </Button>
      </FlexColumn>
      {/* {projectState === "proceed" && (
        <Flex gap={5}>
          <Button
            onClick={() =>
              mount(<ProjectDetail project={project} />, { id: "projects", type: "bottom" })
            }
          >
            정보
          </Button>
        </Flex>
      )} */}
    </Styled.ProjectCard>
  );
};
