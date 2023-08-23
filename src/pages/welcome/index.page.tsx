import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Controller } from "react-hook-form";
import { Button, IconButton, Input, OptionChip, Textarea } from "~/components/Commons";
import { ProfileUploader } from "~/components/Pages/Welcome";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useWelcome } from "./welcome.hooks";
import * as Styled from "./welcome.styles";

const Welcome = () => {
  const app = useWelcome();
  const { t, i18n } = useTranslation("welcome");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Styled.Container onSubmit={app.form.handleSubmit(app.onCreateProfile)}>
      <Styled.PageController>
        <IconButton type="button" name="arrowBack" onClick={app.prevStep} />
        <IconButton type="button" name="arrowForward" onClick={app.nextStep} />
      </Styled.PageController>

      <Styled.Progress current={app.step} max={8} />

      <Styled.SectionDisplay>
        <Styled.SectionContainer step={app.step}>
          <Styled.Section gap={48}>
            <FlexColumn gap={16}>
              <Text size="heading3">{t("닉네임을 만들어주세요")}</Text>
              <Text>{t("프로필에 표시되는 이름으로 언제든 변경 가능해요")}</Text>
            </FlexColumn>

            <Input {...app.form.register("name", { required: true })} />
          </Styled.Section>

          <Styled.Section gap={48}>
            <FlexColumn gap={16}>
              <Text size="heading3">{t("소개글을 적어볼까요")}</Text>
              <Text>{t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}</Text>
            </FlexColumn>

            <Textarea rows={5} {...app.form.register("introduce", { required: true })} />
          </Styled.Section>

          <Styled.Section gap={48} isGrid>
            <Text size="heading3">{t("프로필 사진을 등록해볼까요")}</Text>

            <Controller
              name="imageUrl"
              control={app.form.control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => <ProfileUploader onChange={onChange} />}
            />
          </Styled.Section>

          <Styled.Section gap={48}>
            <Text size="heading3">{t("사용하시는 주요 언어를 알려주세요")}</Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.languages.map((language) => (
                <OptionChip
                  key={language.id}
                  onChange={(event) => app.onChangeLanguageFields(event, language)}
                >
                  {language.name}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section gap={48}>
            <Text size="heading3">{t("사용하시는 주요 기술 스택을 알려주세요")}</Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.skills.map((skill) => (
                <OptionChip
                  key={skill.id}
                  onChange={(event) => app.onChangeSkillFields(event, skill)}
                >
                  {skill.name}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section gap={48}>
            <Text size="heading3">{t("원하시는 프로젝트 타입을 알려주세요")}</Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.projectTypes.map((projectType) => (
                <OptionChip
                  key={projectType.id}
                  onChange={(event) => app.onChangeProjectTypeFields(event, projectType)}
                >
                  {projectType[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section gap={48}>
            <Text size="heading3">{t("어떤 성격이신가요")}</Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.personalities.map((personality) => (
                <OptionChip
                  key={personality.id}
                  onChange={(event) => app.onChangePersonalityFields(event, personality)}
                >
                  {personality[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section gap={48}>
            <Text size="heading3">{t("주로 출몰하는 지역은 어디인가요")}</Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.areas.map((area) => (
                <OptionChip key={area.id} onChange={(event) => app.onChangeAreaFields(event, area)}>
                  {area[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section gap={48}>
            <Text size="heading3">{t("어떤 일을 하고 계시나요")}</Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.jobs.map((job) => (
                <OptionChip key={job.id} onChange={(event) => app.onChangeJobFields(event, job)}>
                  {job[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>

            <Button type="submit">입력 완료</Button>
          </Styled.Section>
        </Styled.SectionContainer>
      </Styled.SectionDisplay>
    </Styled.Container>
  );
};

export default Welcome;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome"]))
    }
  };
};
