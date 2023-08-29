import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Controller } from "react-hook-form";
import { Avatar, Button, IconButton, ImageUploader, Input, SelectChip } from "~/components/Commons";
import { profileKeys, selectProfile } from "~/states/server/profile";
import { Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import type { Database } from "~/types/database";
import { useEditProfile } from "./edit.hooks";
import * as Styled from "./edit.styles";
import type { EditProfileProps } from "./edit.types";

const EditProfile = ({ userId }: EditProfileProps) => {
  const { t, i18n } = useTranslation("editProfile");
  const app = useEditProfile(userId);
  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <>
      <Head>
        <title>{t("프로필 수정")}</title>
      </Head>

      <Styled.Header>
        <IconButton type="button" name="arrowBack" color="content1" onClick={app.handleBack} />
        <Text as="h3" size="heading3">
          {t("프로필 수정하기")}
        </Text>
      </Styled.Header>

      <Styled.Container onSubmit={app.handleSubmit(app.handleUpdateProfile)}>
        <Controller
          name="imageUrl"
          control={app.control}
          render={({ field: { onChange } }) => (
            <ImageUploader
              style={{ display: "flex", justifyContent: "center" }}
              onChange={onChange}
            >
              {app.watch("imageUrl") ? (
                <Avatar src={URL.createObjectURL(app.watch("imageUrl"))} size="xLarge" />
              ) : (
                <Avatar src={app.profileData.imageUrl} size="xLarge" />
              )}
            </ImageUploader>
          )}
        />

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("닉네임")}
          </Text>
          <Input
            placeholder={t("닉네임")}
            maxLength={16}
            {...app.register("name", { maxLength: 16, required: true })}
          />
          <Styled.Desc size="paragraph3">{t("최대 16자")}</Styled.Desc>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("자기소개")}
          </Text>
          <Input
            placeholder={t("소개")}
            maxLength={500}
            {...app.register("introduce", { maxLength: 500, required: true })}
          />
          <Styled.Desc size="paragraph3">{t("최대 500자")}</Styled.Desc>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("나의 포지션")}
          </Text>

          <Styled.ChipsContainer>
            {app.constant.positions.map((position) => (
              <SelectChip
                key={position.id}
                value={position.id}
                {...app.register("positions", { required: true })}
              >
                {position[currentLanguage]}
              </SelectChip>
            ))}
          </Styled.ChipsContainer>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("주요 언어")}
          </Text>

          <Text size="paragraph3">
            {t("사용하는 주요 언어를 선택해주세요 여러개 선택 가능해요")}
          </Text>

          <Styled.ChipsContainer>
            {app.constant.languages.map((language) => (
              <SelectChip
                key={language.id}
                value={language.id}
                {...app.register("languages", { required: true })}
              >
                {language.name}
              </SelectChip>
            ))}
          </Styled.ChipsContainer>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("기술 스택")}
          </Text>

          <Text size="paragraph3">
            {t("사용하는 기술 스택을 선택해주세요 여러개 선택 가능해요")}
          </Text>

          <Styled.ChipsContainer>
            {app.constant.skills.map((skill) => (
              <SelectChip
                key={skill.id}
                value={skill.id}
                {...app.register("skills", { required: true })}
              >
                {skill.name}
              </SelectChip>
            ))}
          </Styled.ChipsContainer>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("원하는 프로젝트 타입")}
          </Text>

          <Styled.ChipsContainer>
            {app.constant.projectTypes.map((projectType) => (
              <SelectChip
                key={projectType.id}
                value={projectType.id}
                {...app.register("projectTypes", { required: true })}
              >
                {projectType[currentLanguage]}
              </SelectChip>
            ))}
          </Styled.ChipsContainer>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("성격")}
          </Text>

          <Text size="paragraph3">{t("최대 두 개 까지 선택할 수 있어요")}</Text>

          <Styled.ChipsContainer>
            {app.constant.personalities.map((personality) => (
              <SelectChip
                key={personality.id}
                value={personality.id}
                {...app.register("personalities", { required: true })}
              >
                {personality[currentLanguage]}
              </SelectChip>
            ))}
          </Styled.ChipsContainer>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("직업")}
          </Text>

          <Styled.ChipsContainer>
            {app.constant.jobs.map((job) => (
              <SelectChip
                key={job.id}
                value={job.id}
                {...app.register("job", { required: true })}
                type="radio"
              >
                {job[currentLanguage]}
              </SelectChip>
            ))}
          </Styled.ChipsContainer>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("활동지역")}
          </Text>

          <Styled.ChipsContainer>
            {app.constant.areas.map((area) => (
              <SelectChip
                key={area.id}
                value={area.id}
                {...app.register("areas", { required: true })}
              >
                {area[currentLanguage]}
              </SelectChip>
            ))}
          </Styled.ChipsContainer>
        </Styled.ProfileItem>

        <Styled.ProfileItem>
          <Text as="h4" size="heading4">
            {t("운영 블로그")}
          </Text>
          <Input placeholder={t("블로그 주소")} {...app.register("blog")} />
        </Styled.ProfileItem>

        <Button type="submit" style={{ width: "100%" }} disabled={!app.formState.isValid}>
          {t("저장")}
        </Button>
      </Styled.Container>
    </>
  );
};

export default EditProfile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

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

  await queryClient.prefetchQuery({
    queryKey: profileKeys.selectProfile(session.user.id),
    queryFn: () => selectProfile(session.user.id)
  });

  return {
    props: {
      userId: session.user.id,
      ...(await serverSideTranslations(ctx.locale, ["editProfile"]))
    }
  };
};
