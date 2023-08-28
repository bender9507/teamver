import { useTranslation } from "next-i18next";
import { language } from "~/assets/icons";
import { Avatar, Chip } from "~/components/Commons";
import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "./ProjectDetail.styles";
import type { ProjectDetailProps } from "./ProjectDetail.types";

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const { t, i18n } = useTranslation("mypage");

  console.log(language);
  return (
    <Styled.Container>
      <Text as="h2" size="heading2">
        {project.name}
      </Text>

      <FlexCenter gap={10}>
        <Avatar src={project.imageUrl} size="small" />
        <Text>{project.ownerProfile.name}</Text>
      </FlexCenter>

      <Styled.ChipsContainer>
        <Chip color="white">{project.projectType.ko}</Chip>
      </Styled.ChipsContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          {t("프로젝트 소개")}
        </Text>
        <Text>{project.description}</Text>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          {t("모집 포지션")}
        </Text>
        <Styled.ChipsContainer>
          {project.positions.map((position) => (
            <Chip color="white" key={position.id}>
              {position.ko}
            </Chip>
          ))}
        </Styled.ChipsContainer>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          {t("희망 역량")}
        </Text>
        <Text>이런 역량을 갖추고 있다면 더 좋아요!</Text>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          {t("주요 언어")}
        </Text>
        <Styled.ChipsContainer>
          {project.languages.map((language) => (
            <Chip color="white" key={language.id}>
              {language.name}
            </Chip>
          ))}
        </Styled.ChipsContainer>
      </Styled.InfoContainer>

      <Styled.InfoContainer>
        <Text as="h3" size="heading3">
          {t("사용 기술")}
        </Text>
        <Styled.ChipsContainer>
          {project.skills.map((skill) => (
            <Chip color="white" key={skill.id}>
              {skill.name}
            </Chip>
          ))}
        </Styled.ChipsContainer>
      </Styled.InfoContainer>
    </Styled.Container>
  );
};
