import { Button } from "~/components/Commons";
import { Flex, Text } from "~/styles/mixins";
import type { Database } from "~/types/database";
import * as Styled from "./ProjectCard.styles";

interface ProjectCardProps {
  projectState: "proceed" | "previous";
  project: Database["public"]["Tables"]["projects"]["Row"] | null;
}

export const ProjectCard = ({ projectState, project }: ProjectCardProps) => {
  return (
    <Styled.ProjectCard>
      <Text>프로젝트 제목1</Text>
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
