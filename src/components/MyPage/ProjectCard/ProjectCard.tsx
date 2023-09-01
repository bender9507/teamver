import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Button } from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import * as Styled from "./ProjectCard.styles";
import type { ProjectCardProps } from "./ProjectCard.types";

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation("Profile");

  return (
    <Styled.ProjectCard>
      <Flex gap={18}>
        <div>
          <Styled.Image src={project.imageUrl} alt="Project Image" />
        </div>
        <FlexColumn justify="around">
          <Text>{project.name}</Text>
          <Link href={`/project/${project.id}`}>
            <Button>{t("팀원 보기")}</Button>
          </Link>
        </FlexColumn>
      </Flex>
    </Styled.ProjectCard>
  );
};
