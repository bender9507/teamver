import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Controller, useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  CheckboxChip,
  IconButton,
  ImageUploader,
  Input
} from "~/components/Commons";
import { useGetConstantQuery } from "~/states/server/constant";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import type { Database } from "~/types/database";
import * as Styled from "./edit.styles";

const EditProfile = ({ userId }: { userId: string }) => {
  const { t, i18n } = useTranslation("editProfile");
  const { data } = useSelectProfileQuery(userId);
  const { control, register, watch, handleSubmit } = useForm({
    defaultValues: {
      positions: data.positions.map((el) => el.id),
      imageUrl: "",
      nickname: data.name,
      descriptions: data.introduce
    }
  });

  const currentLanguage = i18n.language as OneOfLanguage;

  const { data: constant } = useGetConstantQuery([
    "areas",
    "jobs",
    "languages",
    "personalities",
    "positions",
    "projectTypes",
    "skills"
  ]);

  console.log(watch("positions"));

  const testSub = (data: any) => {
    console.log(data);
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
              {/* {watch("imageUrl") ? (
                <Avatar src={URL.createObjectURL(watch("imageUrl"))} size="xLarge" />
              ) : (
                <Avatar src={data.imageUrl} size="xLarge" />
              )} */}
              <Avatar src={data.imageUrl} />
            </ImageUploader>
          )}
        />

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            닉네임
          </Text>
          <Input placeholder="닉네임" maxLength={16} {...register("nickname", { maxLength: 16 })} />
          <Styled.Desc size="paragraph3">최대 16자</Styled.Desc>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            자기소개
          </Text>
          <Input
            placeholder="소개"
            maxLength={500}
            {...register("descriptions", { maxLength: 500 })}
          />
          <Styled.Desc size="paragraph3">최대 500자</Styled.Desc>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            나의 포지션
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.positions.map((position) => (
              <CheckboxChip key={position.id} value={position.id} {...register("positions")}>
                {position[currentLanguage]}
              </CheckboxChip>
            ))}
          </Flex>
        </FlexColumn>

        {/* <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            주요 언어
          </Text>

          <Text size="paragraph3">사용하는 주요 언어를 선택해주세요! 여러개 선택 가능해요.</Text>

          <Flex gap={10} wrap="wrap">
            {constant.languages.map((language) => (
              <CheckboxChip key={language.id} value={language.id} {...register("languages")}>
                {language.name}
              </CheckboxChip>
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
              <CheckboxChip key={skill.id} value={skill.id} {...register("skills")}>
                {skill.name}
              </CheckboxChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            원하는 프로젝트 타입
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.projectTypes.map((projectType) => (
              <CheckboxChip
                key={projectType.id}
                value={projectType.id}
                {...register("projectTypes")}
              >
                {projectType[currentLanguage]}
              </CheckboxChip>
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
              <CheckboxChip
                key={personality.id}
                value={personality.id}
                {...register("personalities")}
              >
                {personality[currentLanguage]}
              </CheckboxChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            직업
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.jobs.map((job) => (
              <RadioChip key={job.id} value={job.id} {...register("jobs")}>
                {job[currentLanguage]}
              </RadioChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            활동지역
          </Text>

          <Flex gap={10} wrap="wrap">
            {constant.areas.map((area) => (
              <CheckboxChip key={area.id} value={area.id} {...register("areas")}>
                {area[currentLanguage]}
              </CheckboxChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn style={{ width: "100%" }} gap={10}>
          <Text as="h4" size="heading4">
            운영 블로그
          </Text>
          <Input placeholder="블로그 주소" {...register("blog")} />
        </FlexColumn> */}

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
