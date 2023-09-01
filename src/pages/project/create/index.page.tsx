import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Controller } from "react-hook-form";
import {
  Button,
  Icon,
  IconButton,
  ImageUploader,
  Input,
  Label,
  SelectChip,
  Textarea
} from "~/components/Commons";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useCreate } from "./create.hooks";
import * as Styled from "./create.styles";

const Create = (props: { user: User }) => {
  const app = useCreate(props);

  const { t, i18n } = useTranslation("project");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <>
      <Head>
        <title>{t("프로젝트 생성")}</title>
      </Head>

      <Styled.Header>
        <IconButton type="button" name="arrowBack" color="content2" onClick={app.handleBack} />

        <Text>{t("프로젝트 생성하기")}</Text>
      </Styled.Header>

      <Styled.Container as="form" gap={36} onSubmit={app.handleCreateProject}>
        <Label title={t("프로젝트 이미지")}>
          <Controller
            name="imageUrl"
            control={app.control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Styled.ImageContainer>
                <ImageUploader onChange={onChange}>
                  {app.watch("imageUrl") ? (
                    <Styled.ImagePreview
                      fill
                      sizes="100%"
                      src={URL.createObjectURL(app.watch("imageUrl"))}
                      alt="project img"
                    />
                  ) : (
                    <Styled.ImageUploadBox>
                      <Styled.ImageUploadButton>
                        <Icon name="add" color="white" width={32} height={32} />
                      </Styled.ImageUploadButton>
                    </Styled.ImageUploadBox>
                  )}
                </ImageUploader>
              </Styled.ImageContainer>
            )}
          />
        </Label>

        <Label title={t("프로젝트 이름")} itemDesc={t("최대 16자")}>
          <Input
            placeholder={t("프로젝트 이름")}
            maxLength={16}
            {...app.register("name", { required: true, maxLength: 16 })}
          />
        </Label>

        <Label title={t("프로젝트 타입")}>
          <Flex gap={12} wrap="wrap">
            {app.constants.projectTypes.map((projectType) => (
              <SelectChip
                type="radio"
                key={projectType.id}
                value={projectType.id}
                {...app.register("projectType", { required: true })}
              >
                {projectType[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </Label>

        <Label title={t("프로젝트 소개")} itemDesc={t("최대 N자", { count: 500 })}>
          <Textarea
            placeholder={t("프로젝트 소개")}
            maxLength={500}
            {...app.register("description", { required: true, maxLength: 500 })}
          />
        </Label>

        <Label title={t("모집 포지션")} desc={t("여러개 선택 가능해요")}>
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
        </Label>

        <Label title={t("모집 인원")}>
          <Flex gap={12} align="center" wrap="wrap">
            <Input
              placeholder={t("모집 인원")}
              maxLength={5}
              {...app.register("recruitCount", { required: true, maxLength: 5 })}
            />
            <Text>{t("명")}</Text>
          </Flex>
        </Label>

        <Label title={t("프로젝트 기간")}>
          <FlexColumn>
            <Flex justify="between">
              <FlexColumn gap={12} style={{ width: "48%" }}>
                <Text>{t("Start Date")}</Text>

                <FlexColumn gap={12}>
                  <Input
                    placeholder={t("시작일")}
                    readOnly
                    value={
                      app.watch("startDate")
                        ? dayjs(app.watch("startDate")).format("DD. MM. YYYY")
                        : ""
                    }
                    onClick={app.setStartDateIsOpen.toggle}
                  />
                </FlexColumn>
              </FlexColumn>

              <FlexColumn gap={12} style={{ width: "48%" }}>
                <Text>{t("Due Date")}</Text>

                <FlexColumn gap={12}>
                  <Input
                    placeholder={t("종료일")}
                    readOnly
                    value={
                      app.watch("endDate") ? dayjs(app.watch("endDate")).format("DD. MM. YYYY") : ""
                    }
                    onClick={app.setEndDateIsOpen.toggle}
                  />
                </FlexColumn>
              </FlexColumn>
            </Flex>

            {app.startDateIsOpen && (
              <Controller
                name="startDate"
                control={app.control}
                render={({ field: { onChange } }) => (
                  <Styled.CalendarWrapper>
                    <Calendar
                      locale="en-EN"
                      nextLabel=">"
                      prevLabel="<"
                      next2Label={null}
                      prev2Label={null}
                      formatDay={(_, date) => dayjs(date).format("D")}
                      onChange={(date) => {
                        app.setStartDateIsOpen.off();
                        onChange(date);
                      }}
                    />
                  </Styled.CalendarWrapper>
                )}
              />
            )}
            {app.endDateIsOpen && (
              <Controller
                name="endDate"
                control={app.control}
                render={({ field: { onChange } }) => (
                  <Styled.CalendarWrapper>
                    <Calendar
                      locale="en-EN"
                      nextLabel=">"
                      prevLabel="<"
                      next2Label={null}
                      prev2Label={null}
                      onChange={(date) => {
                        app.setEndDateIsOpen.off();
                        onChange(date);
                      }}
                    />
                  </Styled.CalendarWrapper>
                )}
              />
            )}
          </FlexColumn>
        </Label>

        <Label
          title={t("주요 언어")}
          desc={t("프로젝트에 필요한 주요 언어를 선택해주세요 여러개 선택 가능해요")}
        >
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
        </Label>

        <Label
          title={t("기술 스택")}
          desc={t("프로젝트를 수행함에 있어 필요한 기술 스택을 선택해주세요 여러개 선택 가능해요")}
        >
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
        </Label>

        <Label
          title={t("활동 지역")}
          desc={t("프로젝트 활동 지역을 선택해주세요 여러개 선택 가능해요")}
        >
          <Flex gap={12} wrap="wrap">
            {app.constants.areas.map((area) => (
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

        <Button type="submit" disabled={!app.formState.isValid}>
          {t("저장")}
        </Button>
      </Styled.Container>
    </>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { user }
  } = await supabaseServer.auth.getUser();

  return {
    props: {
      user: user as User,
      ...(await serverSideTranslations(context.locale, ["project"]))
    }
  };
};
