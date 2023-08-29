import { useTranslation } from "next-i18next";
import Image from "next/image";
import type { ProfileAllDataRow } from "~/states/server/profile";
import type { ProjectAllDataRow } from "~/states/server/project";
import { Flex, FlexColumn, SizeBox, Text } from "~/styles/mixins";
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
  const { t, i18n } = useTranslation("projectDetail");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <FlexColumn>
      <RatioBox ratio="376/275">
        <Image
          src={project.imageUrl}
          fill
          sizes="100%"
          alt="project img"
          style={{ objectFit: "cover" }}
        />

        <Styled.BlurChip>{project.projectType[currentLanguage]}</Styled.BlurChip>
      </RatioBox>

      <Styled.Container>
        <Flex align="center" gap={12}>
          <Avatar src={project.ownerProfile.imageUrl} size="small" />
          <Text>{project.ownerProfile.name}</Text>
        </Flex>

        <SizeBox height={12} />

        <FlexColumn gap={46}>
          <FlexColumn gap={16}>
            <Text size="heading4">{project.name}</Text>

            <Text size="paragraph2" color="content2">
              {project.description}
            </Text>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="heading4">{t("프로젝트 기간")}</Text>

            <Text size="paragraph2" color="content2">
              {project.startDate ?? t("기간 미정")} ~ {project.endDate ?? t("기간 미정")}
            </Text>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="heading4">{t("모집 포지션")}</Text>

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
            <Text size="heading4">{t("주요 언어")}</Text>

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
            <Text size="heading4">{t("기술 스택")}</Text>

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
      </Styled.Container>
    </FlexColumn>
  );
};
