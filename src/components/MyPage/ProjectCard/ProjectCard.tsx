import Link from "next/link";
import { Avatar, Button } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "./ProjectCard.styles";
import type { ProjectCardProps } from "./ProjectCard.types";

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Styled.ProjectCard>
      <Avatar src={project.imageUrl} size="medium" />

      <FlexColumn gap={10}>
        <Text>{project.name}</Text>
        <Button>
          <Link href={`/project/${project.id}`}>팀원 보기</Link>
        </Button>
      </FlexColumn>
    </Styled.ProjectCard>
  );
};
