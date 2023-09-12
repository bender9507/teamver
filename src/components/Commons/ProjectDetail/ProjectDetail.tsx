import { useTranslation } from "next-i18next";
import Image from "next/image";
import type { ProfileAllDataRow } from "~/states/server/profile";
import type { ProjectAllDataRow } from "~/states/server/project";
import { CommonContainer, Flex, FlexColumn, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { Avatar, Chip, RatioBox } from "..";
import * as Styled from "./ProjectDetail.styles";

export const ProjectDetail = ({
  project,
  profile
}: {
  project: ProjectAllDataRow;
  profile: ProfileAllDataRow;
}) => {
  const { t, i18n } = useTranslation("project");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <FlexColumn>
      <RatioBox ratio="376/275">
        <Flex style={{ userSelect: "none", pointerEvents: "none" }}>
          <Image
            src={project.imageUrl}
            fill
            sizes="100%"
            alt="project img"
            style={{ objectFit: "cover" }}
          />
        </Flex>

        <Styled.Container>
          <Styled.UserBox>
            <Avatar src={project.ownerProfile.imageUrl} size="small" />
            <Text color="content1" size="textMediumBold">
              {project.ownerProfile.name}
            </Text>
          </Styled.UserBox>

          <Styled.BlurChip>{project.projectType[currentLanguage]}</Styled.BlurChip>
        </Styled.Container>
      </RatioBox>

      <CommonContainer>
        <FlexColumn gap={46}>
          <FlexColumn gap={16}>
            <Flex align="center" justify="between">
              <Text size="titleMedium">{project.name}</Text>
            </Flex>

            <Text size="textMediumBold" color="gray9" whiteSpace="pre-wrap">
              {project.description}
            </Text>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("프로젝트 기간")}</Text>

            <Flex wrap="wrap">
              <Chip color="backgroundPrimary">
                {project.startDate ?? t("기간 미정")} ~ {project.endDate ?? t("기간 미정")}
              </Chip>
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("모집 포지션")}</Text>

            <Flex gap={12} wrap="wrap">
              {project.positions.map((position) => (
                <Chip
                  key={position.id}
                  color="backgroundPrimary"
                  isSelected={!!profile.positions.find((_position) => _position.id === position.id)}
                >
                  {position[currentLanguage]}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("모집 인원")}</Text>

            <Flex wrap="wrap">
              <Chip color="backgroundPrimary">
                {project.recruitCount}
                {t("명")}
              </Chip>
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("활동 지역")}</Text>

            <Flex gap={12} wrap="wrap">
              {project.areas.map((area) => (
                <Chip
                  key={area.id}
                  color="backgroundPrimary"
                  isSelected={!!profile.areas.find((_area) => _area.id === area.id)}
                >
                  {area[currentLanguage]}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("주요 언어")}</Text>

            <Flex gap={12} wrap="wrap">
              {project.languages.map((language) => (
                <Chip
                  key={language.id}
                  color="backgroundPrimary"
                  isSelected={!!profile.languages.find((_language) => _language.id === language.id)}
                >
                  {language.name}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("기술 스택")}</Text>

            <Flex gap={12} wrap="wrap">
              {project.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  color="backgroundPrimary"
                  isSelected={!!profile.skills.find((_skill) => _skill.id === skill.id)}
                >
                  {skill.name}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>
        </FlexColumn>
      </CommonContainer>
    </FlexColumn>
  );
};
