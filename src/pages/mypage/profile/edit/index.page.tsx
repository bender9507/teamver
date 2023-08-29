import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  IconButton,
  ImageUploader,
  Input,
  SelectChip,
  useDialog
} from "~/components/Commons";
import { useGetConstantQuery } from "~/states/server/constant";
import {
  profileKeys,
  selectProfile,
  useSelectProfileQuery,
  useUpdateProfileMutate
} from "~/states/server/profile";
import { useUploadProfileImageMutate } from "~/states/server/storage";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import type { Database } from "~/types/database";
import { uuid } from "~/utils";
import * as Styled from "./edit.styles";

interface MyPageForm {
  positions: string[];
  projectTypes: string[];
  skills: string[];
  languages: string[];
  personalities: string[];
  job: string;
  areas: string[];
  imageUrl: File;
  name: string;
  introduce: string;
  blog: string | null;
}

const EditProfile = ({ userId }: { userId: string }) => {
  const { t, i18n } = useTranslation("editProfile");
  const { data } = useSelectProfileQuery(userId);
  const { control, register, watch, handleSubmit } = useForm<MyPageForm>({
    defaultValues: {
      positions: data.positions.map((el) => String(el.id)),
      projectTypes: data.projectTypes.map((el) => String(el.id)),
      skills: data.skills.map((el) => String(el.id)),
      languages: data.languages.map((el) => String(el.id)),
      personalities: data.personalities.map((el) => String(el.id)),
      job: String(data.job.id),
      areas: data.areas.map((el) => String(el.id)),
      name: data.name,
      introduce: data.introduce,
      blog: data.blog
    }
  });
  const queryClient = useQueryClient();
  const currentLanguage = i18n.language as OneOfLanguage;
  const { alert } = useDialog();
  const router = useRouter();

  const { data: constant } = useGetConstantQuery([
    "areas",
    "jobs",
    "languages",
    "personalities",
    "positions",
    "projectTypes",
    "skills"
  ]);

  const { mutate } = useUpdateProfileMutate({
    onSuccess: async () => {
      queryClient.invalidateQueries(profileKeys.selectProfile(userId));
      await alert({ message: "저장완료" });
      router.push("/mypage");
    }
  });
  const { mutateAsync: uploadProfileImageMutateAsync } = useUploadProfileImageMutate();

  const testSub: Parameters<typeof handleSubmit>[0] = async ({
    positions,
    languages,
    personalities,
    projectTypes,
    areas,
    skills,
    imageUrl,
    job,
    ...rest
  }: MyPageForm) => {
    const mappings = {
      positions: positions.map((el) => Number(el)),
      languages: languages.map((el) => Number(el)),
      personalities: personalities.map((el) => Number(el)),
      projectTypes: projectTypes.map((el) => Number(el)),
      areas: areas.map((el) => Number(el)),
      skills: skills.map((el) => Number(el)),
      job: Number(job)
    };

    if (!imageUrl) {
      mutate({
        positions: mappings.positions,
        languages: mappings.languages,
        personalities: mappings.personalities,
        projectTypes: mappings.projectTypes,
        areas: mappings.areas,
        skills: mappings.skills,
        job: mappings.job,
        id: data.id,
        ...rest
      });
      return;
    }
    const { publicUrl } = await uploadProfileImageMutateAsync({
      file: imageUrl,
      name: `${uuid()}_${new Date().getTime()}`
    });

    mutate({
      positions: mappings.positions,
      languages: mappings.languages,
      personalities: mappings.personalities,
      projectTypes: mappings.projectTypes,
      areas: mappings.areas,
      skills: mappings.skills,
      imageUrl: publicUrl,
      id: data.id,
      ...rest
    });
  };

  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>

      <Styled.Header>
        <IconButton type="button" name="arrowBack" color="content1" />
        <Text as="h3" size="heading3">
          프로필 수정하기
        </Text>
      </Styled.Header>

      <Styled.Container as="form" gap={30} align="center" onSubmit={handleSubmit(testSub)}>
        <Controller
          name="imageUrl"
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange } }) => (
            <ImageUploader
              style={{ display: "flex", justifyContent: "center" }}
              onChange={onChange}
            >
              {watch("imageUrl") ? (
                <Avatar src={URL.createObjectURL(watch("imageUrl"))} size="xLarge" />
              ) : (
                <Avatar src={data.imageUrl} size="xLarge" />
              )}
            </ImageUploader>
          )}
        />

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            닉네임
          </Text>
          <Input placeholder="닉네임" maxLength={16} {...register("name", { maxLength: 16 })} />
          <Styled.Desc size="paragraph3">최대 16자</Styled.Desc>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            자기소개
          </Text>
          <Input
            placeholder="소개"
            maxLength={500}
            {...register("introduce", { maxLength: 500 })}
          />
          <Styled.Desc size="paragraph3">최대 500자</Styled.Desc>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            나의 포지션
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.positions.map((position) => (
              <SelectChip key={position.id} value={position.id} {...register("positions")}>
                {position[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            주요 언어
          </Text>

          <Text size="paragraph3">사용하는 주요 언어를 선택해주세요! 여러개 선택 가능해요.</Text>

          <Flex gap={10} wrap="wrap">
            {constant.languages.map((language) => (
              <SelectChip key={language.id} value={language.id} {...register("languages")}>
                {language.name}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            기술 스택
          </Text>

          <Text size="paragraph3">사용하는 기술 스택을 선택해주세요! 여러개 선택 가능해요.</Text>

          <Flex gap={10} wrap="wrap">
            {constant.skills.map((skill) => (
              <SelectChip key={skill.id} value={skill.id} {...register("skills")}>
                {skill.name}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            원하는 프로젝트 타입
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.projectTypes.map((projectType) => (
              <SelectChip key={projectType.id} value={projectType.id} {...register("projectTypes")}>
                {projectType[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            성격
          </Text>

          <Text size="paragraph3">최대 두 개 까지 선택할 수 있어요!</Text>

          <Flex gap={10} wrap="wrap">
            {constant.personalities.map((personality) => (
              <SelectChip
                key={personality.id}
                value={personality.id}
                {...register("personalities")}
              >
                {personality[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            직업
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.jobs.map((job) => (
              <SelectChip key={job.id} value={job.id} {...register("job")} type="radio">
                {job[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            활동지역
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.areas.map((area) => (
              <SelectChip key={area.id} value={area.id} {...register("areas")}>
                {area[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            운영 블로그
          </Text>
          <Input placeholder="블로그 주소" {...register("blog")} />
        </FlexColumn>

        <Button type="submit" style={{ width: "100%" }}>
          저장
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
