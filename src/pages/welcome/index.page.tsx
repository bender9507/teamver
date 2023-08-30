import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Controller } from "react-hook-form";
import {
  Button,
  Icon,
  IconButton,
  ImageUploader,
  Input,
  SelectChip,
  Textarea
} from "~/components/Commons";
import { HTTP_REGEX } from "~/constants/regex";
import { routes } from "~/constants/routes";
import { selectProfile } from "~/states/server/profile";
import { Flex, FlexColumn, Grid, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useWelcome } from "./welcome.hooks";
import * as Styled from "./welcome.styles";

const Welcome = (props: { user: User }) => {
  const app = useWelcome(props);
  const { t, i18n } = useTranslation("welcome");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Styled.Container>
      <Styled.Header>
        <IconButton type="button" name="arrowBack" color="content1" onClick={app.prevStep} />
      </Styled.Header>

      <Styled.SectionContainer onSubmit={app.handleCreateProfile}>
        <Styled.Progress current={app.step} max={app.lastStep} />

        {app.step === 0 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
                {t("팀버에서만의 닉네임을 만들어보세요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9" whiteSpace="pre-wrap">
                {t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}
              </Text>
            </FlexColumn>

            <FlexColumn gap={14}>
              <Input
                {...app.register("name")}
                onChange={app.validateNickName}
                maxLength={16}
                placeholder={t("닉네임")}
              />

              <Flex style={{ marginLeft: "18px" }}>
                {!app.successMessage && !app.errorMessage && (
                  <Text color="gray4" size="textMediumBold">
                    {t("최대 N글자", { count: 16 })}
                  </Text>
                )}
                {app.successMessage && (
                  <Text color="primary" size="textMediumBold">
                    {app.successMessage}
                  </Text>
                )}
                {app.errorMessage && (
                  <Text color="error" size="textMediumBold">
                    {app.errorMessage}
                  </Text>
                )}
              </Flex>
            </FlexColumn>
          </Styled.Section>
        )}

        {app.step === 1 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge">
                {t("멋진 소개글을 적어볼까요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("프로필에 표시되는 소개글로 언제든 변경 가능해요")}
              </Text>
            </FlexColumn>

            <FlexColumn gap={14}>
              <Textarea
                {...app.register("introduce", { required: true, maxLength: 500 })}
                maxLength={500}
                placeholder={t("내 소개")}
              />

              <Text color="gray4" size="textMediumBold" style={{ marginLeft: "18px" }}>
                {t("최대 N자", { count: 500 })}
              </Text>
            </FlexColumn>
          </Styled.Section>
        )}

        {app.step === 2 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
                {t("사용하는 주요 언어를 선택해 볼까요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.languages.map((language) => (
                <SelectChip
                  key={language.id}
                  value={language.id}
                  {...app.register("languages", { required: true })}
                >
                  {language.name}
                </SelectChip>
              ))}
            </Flex>
          </Styled.Section>
        )}

        {app.step === 3 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
                {t("사용하는 기술 스택을 선택해 볼까요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.skills.map((skill) => (
                <SelectChip
                  key={skill.id}
                  value={skill.id}
                  {...app.register("skills", { required: true })}
                >
                  {skill.name}
                </SelectChip>
              ))}
            </Flex>
          </Styled.Section>
        )}

        {app.step === 4 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge">
                {t("나의 포지션을 선택해볼까요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.positions.map((position) => (
                <SelectChip
                  key={position.id}
                  value={position.id}
                  {...app.register("positions", { required: true })}
                >
                  {position[currentLanguage]}
                </SelectChip>
              ))}
            </Flex>
          </Styled.Section>
        )}

        {app.step === 5 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
                {t("도전해 보고 싶은 프로젝트 타입을 선택해볼까요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.projectTypes.map((pt) => (
                <SelectChip
                  key={pt.id}
                  value={pt.id}
                  {...app.register("projectTypes", { required: true })}
                >
                  {pt[currentLanguage]}
                </SelectChip>
              ))}
            </Flex>
          </Styled.Section>
        )}

        {app.step === 6 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
                {t("나를 잘 나타내는 키워드를 선택해볼까요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("최대 두 개까지 선택할 수 있어요")}
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.personalities.map((personality) => (
                <SelectChip
                  key={personality.id}
                  value={personality.id}
                  {...app.register("personalities", {
                    required: true,
                    validate: (value) => value.length < 3
                  })}
                >
                  {personality[currentLanguage]}
                </SelectChip>
              ))}
            </Flex>
          </Styled.Section>
        )}

        {app.step === 7 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
                {t("주로 활동하는 지역은 어디인가요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("여러 개 선택 할 수 있어요")}
              </Text>
            </FlexColumn>

            <Grid gap={10} column={5}>
              {app.constants.areas.map((area) => (
                <SelectChip
                  key={area.id}
                  value={area.id}
                  {...app.register("areas", { required: true, maxLength: 2 })}
                >
                  {area[currentLanguage]}
                </SelectChip>
              ))}
            </Grid>
          </Styled.Section>
        )}

        {app.step === 8 && (
          <Styled.Section>
            <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
              {t("운영 블로그가 있다면 알려주세요")}
            </Text>

            <Input
              {...app.register("blog", {
                pattern: HTTP_REGEX
              })}
              placeholder={t("블로그 주소")}
            />
          </Styled.Section>
        )}

        {app.step === 9 && (
          <Styled.Section>
            <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
              {t("거의 다 왔어요 어떤 일을 하고 계시나요")}
            </Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.jobs.map((job) => (
                <SelectChip
                  key={job.id}
                  type="radio"
                  value={job.id}
                  {...app.register("job", { required: true })}
                >
                  {job[currentLanguage]}
                </SelectChip>
              ))}
            </Flex>
          </Styled.Section>
        )}

        {app.step === 10 && (
          <Styled.Section>
            <Text as="h3" size="titleLarge">
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

                    <Styled.Gradient />

                    <Styled.ProfileDesc gap={16}>
                      <Text size="titleSmall">{app.watch("name")}</Text>

                      <Text size="textSmall" color="content2">
                        {app.watch("introduce")}
                      </Text>
                    </Styled.ProfileDesc>
                  </Styled.ProfileCardContainer>
                </ImageUploader>
              )}
            />
          </Styled.Section>
        )}

        {app.step === 11 && (
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="titleLarge" whiteSpace="pre-wrap">
                {t("환영합니다 회원님은 프로젝트의 모집자인가요 참가자인가요")}
              </Text>

              <Text as="p" size="textSmallBold" color="gray9">
                {t("프로필에서 언제든 변경 가능해요")}
              </Text>
            </FlexColumn>

            <Grid column={2} gap={8}>
              {app.constants.roles.map((role) => (
                <SelectChip
                  key={role.id}
                  value={role.id}
                  type="radio"
                  size="large"
                  {...app.register("role", { required: true })}
                >
                  {role[currentLanguage]}
                </SelectChip>
              ))}
            </Grid>
          </Styled.Section>
        )}

        {app.step === app.lastStep && <Button disabled={app.isDisabled}>{t("시작하기")}</Button>}

        {app.step !== app.lastStep && (
          <Button type="button" disabled={app.isDisabled} onClick={app.nextStep}>
            {t("다음")}
          </Button>
        )}
      </Styled.SectionContainer>
    </Styled.Container>
  );
};

export default Welcome;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const { data: userData } = await supabaseServer.auth.getUser();

  const user = userData.user as User;

  const profile = await selectProfile(user.id);

  if (profile) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false
      }
    };
  }

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale, ["welcome"]))
    }
  };
};
