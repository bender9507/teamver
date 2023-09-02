import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Controller } from "react-hook-form";
import FrameIcon from "~/assets/icons/frame.svg";
import {
  Avatar,
  Button,
  ImageUploader,
  Input,
  Label,
  SelectChip,
  Textarea
} from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { HTTP_REGEX } from "~/constants/regex";
import {
  Flex,
  FlexCenter,
  FlexColumn,
  LayoutContent,
  LayoutHeader,
  SizeBox,
  Text
} from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import type { Database } from "~/types/database";
import { useProfileEdit } from "./edit.hooks";
import * as Styled from "./edit.styles";

const ProfileEdit = (props: { user: User }) => {
  const app = useProfileEdit(props);
  const { t, i18n } = useTranslation("profile");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <LayoutHeader>
      <TitleHeader title={t("프로필 수정")} onPrevious={app.handleBack} />

      <LayoutContent as="form" padding="22px" gap={32} onSubmit={app.onSubmit}>
        <FlexCenter>
          <Controller
            name="imageUrl"
            control={app.control}
            render={({ field: { onChange } }) => (
              <Flex style={{ position: "relative" }}>
                {app.watch("imageUrl") ? (
                  <Avatar src={URL.createObjectURL(app.watch("imageUrl"))} size="large" />
                ) : (
                  <Avatar src={app.profile.imageUrl} size="large" />
                )}
                <Styled.UploaderContainer>
                  <ImageUploader onChange={onChange}>
                    <FrameIcon />
                  </ImageUploader>
                </Styled.UploaderContainer>
              </Flex>
            )}
          />
        </FlexCenter>

        <FlexColumn>
          <Text size="titleSmall" style={{ marginBottom: "16px" }}>
            {t("닉네임")}
          </Text>
          <Input
            maxLength={16}
            {...app.register("name", { required: true, maxLength: 16 })}
            onChange={app.validateNickName}
          />
          {!app.successMessage && !app.errorMessage && (
            <Styled.ValidateText
              state={app.formState.errors.name?.type === "required" ? "error" : "normal"}
            >
              {app.formState.errors.name?.type === "required"
                ? t("닉네임은 필수 항목이에요 멋진 닉네임을 지어주세요")
                : t("최대 N자", { count: 16 })}
            </Styled.ValidateText>
          )}
          {app.successMessage && (
            <Styled.ValidateText state="success">{app.successMessage}</Styled.ValidateText>
          )}
          {app.errorMessage && (
            <Styled.ValidateText state="error">{app.errorMessage}</Styled.ValidateText>
          )}
        </FlexColumn>

        <Label title={t("자기소개")} itemDesc={t("최대 N자", { count: 500 })}>
          <Textarea
            maxLength={500}
            {...app.register("introduce", { required: true, maxLength: 500 })}
          />
        </Label>

        <Label title={t("나의 포지션")}>
          <Flex gap={12}>
            {app.constant.positions.map((position) => (
              <SelectChip
                key={position.id}
                value={position.id}
                {...app.register("positions", { required: true })}
              >
                {position[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </Label>

        <Label
          title={t("주요 언어")}
          desc={t("사용하는 주요 언어를 선택해주세요 여러개 선택 가능해요")}
        >
          <Flex gap={12} wrap="wrap">
            {app.constant.languages.map((language) => (
              <SelectChip
                key={language.id}
                value={language.id}
                {...app.register("languages", { required: true })}
              >
                {language.name}
              </SelectChip>
            ))}
          </Flex>
        </Label>

        <Label
          title={t("기술 스택")}
          desc={t("사용하는 기술 스택을 선택해주세요 여러개 선택 가능해요")}
        >
          <Flex gap={12} wrap="wrap">
            {app.constant.skills.map((skill) => (
              <SelectChip
                key={skill.id}
                value={skill.id}
                {...app.register("skills", { required: true })}
              >
                {skill.name}
              </SelectChip>
            ))}
          </Flex>
        </Label>

        <Label title={t("원하는 프로젝트 타입")} desc={t("여러개 선택 가능해요")}>
          <Flex gap={12} wrap="wrap">
            {app.constant.projectTypes.map((projectType) => (
              <SelectChip
                key={projectType.id}
                value={projectType.id}
                {...app.register("projectTypes", { required: true })}
              >
                {projectType[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </Label>

        <Label title={t("성격")} desc={t("최대 두 개 까지 선택할 수 있어요")}>
          <Flex gap={12} wrap="wrap">
            {app.constant.personalities.map((personality) => (
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
        </Label>

        <Label title={t("직업")}>
          <Flex gap={12} wrap="wrap">
            {app.constant.jobs.map((job) => (
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
        </Label>

        <Label title={t("활동지역")} desc={t("여러개 선택 가능해요")}>
          <Flex gap={12} wrap="wrap">
            {app.constant.areas.map((area) => (
              <SelectChip
                key={area.id}
                value={area.id}
                {...app.register("areas", { required: true })}
              >
                {area[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </Label>

        <Label title={t("운영 블로그")}>
          <Input {...app.register("blog", { pattern: HTTP_REGEX })} />
        </Label>

        <SizeBox height={40} />

        <Button disabled={!app.formState.isValid}>{t("저장")}</Button>
      </LayoutContent>
    </LayoutHeader>
  );
};

export default ProfileEdit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseClient = createPagesServerClient<Database>(ctx);

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session.user,
      ...(await serverSideTranslations(ctx.locale, ["profile"]))
    }
  };
};
