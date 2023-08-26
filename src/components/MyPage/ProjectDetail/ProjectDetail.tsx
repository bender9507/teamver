import { Avatar, Chip } from "~/components/Commons";
import { Flex, FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./ProjectDetail.styles";
import type { ProjectDetailProps } from "./ProjectDetail.types";

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  console.log(project.types);
  return (
    <Styled.Container>
      <Text as="h2" size="heading2">
        {project.name}
      </Text>

      <FlexCenter gap={10}>
        <Avatar src={project.imageUrl} size="small" />
        <Text>{project.ownerId}</Text>
      </FlexCenter>

      <Flex gap={10}>
        {project.types.map((type) => (
          <Chip bgColor="gray5" color="white" key={type.id}>
            {type.ko}
          </Chip>
        ))}
      </Flex>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          프로젝트 소개
        </Text>
        <Text>프로젝트 소개입니다.</Text>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          모집 포지션
        </Text>
        <Text>포지션 chips</Text>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          희망 역량
        </Text>
        <Text>이런 역량을 갖추고 있다면 더 좋아요!</Text>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          주요 언어
        </Text>
        <Text>언어 chips</Text>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          사용 기술
        </Text>
        <Text>기술 chips</Text>
      </Styled.InfoContainer>
    </Styled.Container>
  );
};
