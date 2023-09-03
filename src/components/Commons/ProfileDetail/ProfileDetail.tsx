import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import type {
  ConstantAreaRow,
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantSkillRow
} from "~/states/server/constant";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { CommonContainer, Flex, FlexColumn, Position, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { Chip, RatioBox } from "..";
import * as Styled from "./ProfileDetail.styles";

export const ProfileDetail = ({
  profile,
  filter
}: {
  profile: ProfileAllDataRow;
  filter: {
    positions: ConstantPositionRow["id"][];
    languages: ConstantLanguageRow["id"][];
    skills: ConstantSkillRow["id"][];
    areas: ConstantAreaRow["id"][];
  };
}) => {
  const { t, i18n } = useTranslation("profile");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <FlexColumn>
      <RatioBox ratio="376/275">
        <Image
          src={profile.imageUrl}
          fill
          sizes="100%"
          alt="profile img"
          style={{ objectFit: "cover" }}
        />

        <Position position="absolute" bottom={24} right={32}>
          <Flex gap={12}>
            {profile.personalities.map((personality) => (
              <Styled.BlurChip key={personality.id}>{personality[currentLanguage]}</Styled.BlurChip>
            ))}
          </Flex>
        </Position>
      </RatioBox>

      <CommonContainer>
        <FlexColumn gap={36}>
          <FlexColumn gap={16}>
            <Text size="titleMedium">{profile.name}</Text>

            <Text size="textMediumBold" color="gray9">
              {profile.introduce}
            </Text>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("포지션")}</Text>

            <Flex gap={12} wrap="wrap">
              {profile.positions.map((position) => (
                <Chip
                  key={position.id}
                  color="backgroundPrimary"
                  isSelected={
                    !!filter.positions.find((_position) => Number(_position) === position.id)
                  }
                >
                  {position[currentLanguage]}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("주요 언어")}</Text>

            <Flex gap={12} wrap="wrap">
              {profile.languages.map((language) => (
                <Chip
                  key={language.id}
                  color="backgroundPrimary"
                  isSelected={
                    !!filter.languages.find((_language) => Number(_language) === language.id)
                  }
                >
                  {language.name}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("기술 스택")}</Text>

            <Flex gap={12} wrap="wrap">
              {profile.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  color="backgroundPrimary"
                  isSelected={!!filter.skills.find((_skill) => Number(_skill) === skill.id)}
                >
                  {skill.name}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("활동 지역")}</Text>

            <Flex gap={12} wrap="wrap">
              {profile.areas.map((area) => (
                <Chip
                  key={area.id}
                  color="backgroundPrimary"
                  isSelected={!!filter.areas.find((_area) => Number(_area) === area.id)}
                >
                  {area[currentLanguage]}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("원하는 프로젝트 타입")}</Text>

            <Flex gap={12} wrap="wrap">
              {profile.projectTypes.map((projectType) => (
                <Chip key={projectType.id} color="backgroundPrimary">
                  {projectType[currentLanguage]}
                </Chip>
              ))}
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("현재 직업 상태")}</Text>

            <Flex gap={12} wrap="wrap">
              <Chip color="backgroundPrimary">{profile.job[currentLanguage]}</Chip>
            </Flex>
          </FlexColumn>

          <FlexColumn gap={16}>
            <Text size="titleMedium">{t("Github 주소")}</Text>

            <Link href={`https://github.com/${profile.github}`} target="_blank">
              <Styled.AdressBox>
                <Text size="textMediumBold" color="gray9">
                  https://github.com/{profile.github}
                </Text>
              </Styled.AdressBox>
            </Link>
          </FlexColumn>

          {profile.blog && (
            <FlexColumn gap={16}>
              <Text size="titleMedium">{t("운영 블로그")}</Text>

              <Link href={profile.blog} target="_blank">
                <Styled.AdressBox>
                  <Text size="textMediumBold" color="gray9">
                    {profile.blog}
                  </Text>
                </Styled.AdressBox>
              </Link>
            </FlexColumn>
          )}
        </FlexColumn>
      </CommonContainer>
    </FlexColumn>
  );
};
