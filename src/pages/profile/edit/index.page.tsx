import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Controller } from "react-hook-form";
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
import { Flex, SizeBox } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import type { Database } from "~/types/database";
import { useProfileEdit } from "./edit.hooks";
import * as Styled from "./edit.styles";

const ProfileEdit = (props: { user: User }) => {
  const app = useProfileEdit(props);
  const { t, i18n } = useTranslation("profile");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Styled.Container onSubmit={app.onSubmit}>
      <TitleHeader title={t("프로필 수정")} />

      <Controller
        name="imageUrl"
        control={app.control}
        render={({ field: { onChange } }) => (
          <ImageUploader style={{ width: "fit-content", margin: "0 auto" }} onChange={onChange}>
            {app.watch("imageUrl") ? (
              <Avatar src={URL.createObjectURL(app.watch("imageUrl"))} size="xLarge" />
            ) : (
              <Avatar src={app.profile.imageUrl} size="xLarge" />
            )}
          </ImageUploader>
        )}
      />

      <Label title={t("닉네임")} itemDesc={t("최대 N자", { count: 16 })}>
        <Input maxLength={16} {...app.register("name", { required: true, maxLength: 16 })} />
      </Label>

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

      <Button>{t("저장")}</Button>
    </Styled.Container>
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
