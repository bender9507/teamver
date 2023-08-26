import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Controller } from "react-hook-form";
import {
  Button,
  CheckboxChip,
  Icon,
  IconButton,
  ImageUploader,
  Input,
  RadioChip,
  Textarea
} from "~/components/Commons";
import { HTTP_REGEX } from "~/constants/regex";
import { Flex, FlexColumn, Grid, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useWelcome } from "./welcome.hooks";
import * as Styled from "./welcome.styles";

const Welcome = () => {
  const app = useWelcome();
  const { t, i18n } = useTranslation("welcome");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Styled.Container onSubmit={app.handleSubmit(app.handleCreateProfile)}>
      <Styled.Header>
        <IconButton type="button" name="arrowBack" color="content1" onClick={app.prevStep} />
      </Styled.Header>

      <Styled.Progress current={app.step} max={app.lastStep} />

      <SizeBox height={26} />

      <Styled.SectionDisplay>
        <Styled.SectionContainer step={app.step}>
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3" whiteSpace="pre-wrap">
                {t("팀버에서만의 닉네임을 만들어보세요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2" whiteSpace="pre-wrap">
                {t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}
              </Text>
            </FlexColumn>

            <FlexColumn gap={14}>
              <Input onChange={app.validateNickName} maxLength={16} placeholder={t("닉네임")} />

              <Flex style={{ marginLeft: "18px" }}>
                {!app.successMessage && !app.errorMessage && (
                  <Text color="gray4" size="paragraph3">
                    {t("최대 16글자")}
                  </Text>
                )}
                {app.successMessage && (
                  <Text color="primary" size="paragraph3">
                    {app.successMessage}
                  </Text>
                )}
                {app.errorMessage && (
                  <Text color="error" size="paragraph3">
                    {app.errorMessage}
                  </Text>
                )}
              </Flex>
            </FlexColumn>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                {t("멋진 소개글을 적어볼까요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}
              </Text>
            </FlexColumn>

            <FlexColumn gap={14}>
              <Textarea
                {...app.register("introduce", { required: true, maxLength: 300 })}
                maxLength={300}
                placeholder={t("내 소개")}
              />

              <Text color="gray4" size="paragraph3" style={{ marginLeft: "18px" }}>
                {t("최대 300자")}
              </Text>
            </FlexColumn>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                {t("사용하는 주요 언어를 선택해 볼까요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.languages.map((language) => (
                <CheckboxChip
                  key={language.id}
                  value={language.id}
                  {...app.register("languages", { required: true })}
                >
                  {language.name}
                </CheckboxChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                {t("사용하는 기술 스택을 선택해 볼까요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.skills.map((skill) => (
                <CheckboxChip
                  key={skill.id}
                  value={skill.id}
                  {...app.register("skills", { required: true })}
                >
                  {skill.name}
                </CheckboxChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                {t("나의 포지션을 선택해볼까요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.positions.map((position) => (
                <CheckboxChip
                  key={position.id}
                  value={position.id}
                  {...app.register("positions", { required: true })}
                >
                  {position[currentLanguage]}
                </CheckboxChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3" whiteSpace="pre-wrap">
                {t("도전해 보고 싶은 프로젝트 타입을 선택해볼까요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.projectTypes.map((pt) => (
                <CheckboxChip
                  key={pt.id}
                  value={pt.id}
                  {...app.register("projectTypes", { required: true })}
                >
                  {pt[currentLanguage]}
                </CheckboxChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3" whiteSpace="pre-wrap">
                {t("나를 잘 나타내는 키워드를 선택해볼까요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("최대 두 개까지 선택할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.personalities.map((personality) => (
                <CheckboxChip
                  key={personality.id}
                  value={personality.id}
                  {...app.register("personalities", {
                    required: true,
                    validate: (value) => value.length < 3
                  })}
                >
                  {personality[currentLanguage]}
                </CheckboxChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3" whiteSpace="pre-wrap">
                {t("주로 활동하는 지역은 어디인가요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Grid gap={12} column={5}>
              {app.constants.areas.map((area) => (
                <CheckboxChip
                  key={area.id}
                  value={area.id}
                  {...app.register("areas", { required: true, maxLength: 2 })}
                >
                  {area[currentLanguage]}
                </CheckboxChip>
              ))}
            </Grid>
          </Styled.Section>

          <Styled.Section>
            <Text as="h3" size="heading3" whiteSpace="pre-wrap">
              {t("운영 블로그가 있다면 알려주세요")}
            </Text>

            <Input
              {...app.register("blog", {
                pattern: HTTP_REGEX
              })}
              placeholder={t("블로그 주소")}
            />
          </Styled.Section>

          <Styled.Section>
            <Text as="h3" size="heading3" whiteSpace="pre-wrap">
              {t("거의 다 왔어요 어떤 일을 하고 계시나요")}
            </Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.jobs.map((job) => (
                <RadioChip
                  key={job.id}
                  value={job.id}
                  chipProps={{ isSelected: Number(app.watch("jobs")) === job.id }}
                  {...app.register("jobs", { required: true })}
                >
                  {job[currentLanguage]}
                </RadioChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <Text as="h3" size="heading3">
              {t("마지막으로 나를 나타낼 수 있는 프로필 사진을 올려볼까요")}
            </Text>

            <Controller
              name="imageUrl"
              control={app.control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <ImageUploader onChange={onChange} style={{ marginBottom: "48px" }}>
                  <Styled.ProfileCardContainer>
                    {app.watch("imageUrl") ? (
                      <Styled.ProfileImage
                        fill
                        sizes="100%"
                        src={URL.createObjectURL(app.watch("imageUrl"))}
                        alt="profile image"
                      />
                    ) : (
                      <Styled.ProfileAddButton>
                        <Icon name="add" color="white" />
                      </Styled.ProfileAddButton>
                    )}

                    <Styled.ProfileDesc gap={16}>
                      <Text size="heading3">{app.watch("name")}</Text>

                      <Text size="paragraph3" color="content2">
                        {app.watch("introduce")}
                      </Text>
                    </Styled.ProfileDesc>
                  </Styled.ProfileCardContainer>
                </ImageUploader>
              )}
            />
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3" whiteSpace="pre-wrap">
                {t("환영합니다 회원님은 프로젝트의 모집자인가요 참가자인가요")}
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                {t("프로필에서 언제든 변경 가능해요")}
              </Text>
            </FlexColumn>

            <Grid column={2} gap={8}>
              {app.constants.roles.map((role) => (
                <RadioChip
                  key={role.id}
                  value={role.id}
                  chipProps={{ isSelected: Number(app.watch("role")) === role.id, size: "large" }}
                  {...app.register("role", { required: true })}
                >
                  {role[currentLanguage]}
                </RadioChip>
              ))}
            </Grid>
          </Styled.Section>
        </Styled.SectionContainer>
      </Styled.SectionDisplay>

      {app.step === app.lastStep && <Button disabled={app.isDisabled}>{t("시작하기")}</Button>}

      {app.step !== app.lastStep && (
        <Button type="button" disabled={app.isDisabled} onClick={app.nextStep}>
          {t("다음")}
        </Button>
      )}
    </Styled.Container>
  );
};

export default Welcome;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["welcome"]))
    }
  };
};
