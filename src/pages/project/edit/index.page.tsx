import { QueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Calendar from "react-calendar";
import { Controller } from "react-hook-form";
import { Button, ImageUploader, Input, Label, SelectChip, Textarea } from "~/components/Commons";
import { TitleHeader } from "~/components/Shared";
import { projectsKey, selectProject } from "~/states/server/project";
import { Flex, FlexColumn, LayoutContent, LayoutHeader, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { requireAuthentication } from "~/utils";
import { useEdit } from "./edit.hooks";
import * as Styled from "./edit.styles";

const Edit = () => {
  const app = useEdit();
  const { t, i18n } = useTranslation("project");

  const currentLanguage = i18n.language as OneOfLanguage;
  return (
    <>
      <Head>
        <title>{t("프로젝트 수정")}</title>
      </Head>

      <LayoutHeader>
        <TitleHeader title={t("프로젝트 수정하기")} onPrevious={app.handleBack} />

        <LayoutContent as="form" gap={36} padding="22px" onSubmit={app.handleEditProject}>
          <Label title={t("프로젝트 이미지")}>
            <Controller
              name="imageUrl"
              control={app.control}
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
                      <Styled.ImagePreview
                        fill
                        sizes="100%"
                        src={app.project.imageUrl}
                        alt="project img"
                      />
                    )}
                  </ImageUploader>
                </Styled.ImageContainer>
              )}
            />
          </Label>

          <Label title={t("프로젝트 이름")}>
            <FlexColumn gap={8}>
              <Input
                placeholder={t("프로젝트 이름")}
                maxLength={16}
                {...app.register("name", { required: true, maxLength: 16 })}
              />

              <Styled.Desc size="paragraph3" color="gray4">
                {t("최대 16자")}
              </Styled.Desc>
            </FlexColumn>
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
                        app.isStartIndefinite
                          ? t("미정")
                          : (app.watch("startDate") &&
                              dayjs(app.watch("startDate")).format("DD. MM. YYYY")) ||
                            ""
                      }
                      onClick={() => {
                        app.setEndDateIsOpen.off();
                        app.setStartDateIsOpen.toggle();
                      }}
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
                        app.isEndIndefinite
                          ? t("미정")
                          : (app.watch("endDate") &&
                              dayjs(app.watch("endDate")).format("DD. MM. YYYY")) ||
                            ""
                      }
                      onClick={() => {
                        app.setStartDateIsOpen.off();
                        app.setEndDateIsOpen.toggle();
                      }}
                    />
                  </FlexColumn>
                </FlexColumn>
              </Flex>

              {app.startDateIsOpen || app.endDateIsOpen ? (
                <>
                  <hr style={{ border: "1px solid #383A39", marginTop: "18px" }} />
                  <Controller
                    name={app.startDateIsOpen ? "startDate" : "endDate"}
                    control={app.control}
                    render={({ field }) => (
                      <Styled.CalendarWrapper>
                        <Calendar
                          locale="en-EN"
                          nextLabel=">"
                          prevLabel="<"
                          next2Label={null}
                          prev2Label={null}
                          formatDay={(_, date) => dayjs(date).format("D")}
                          onChange={(date) => {
                            (app.startDateIsOpen
                              ? app.setStartDateIsOpen
                              : app.setEndDateIsOpen
                            ).off();
                            field.onChange(date);
                            // (app.startDateIsOpen ? app.setStartIsIndefinite(false) : app.setEndIsIndefinite(false))
                            if (app.startDateIsOpen) {
                              app.setStartIsIndefinite(false);
                            } else {
                              app.setEndIsIndefinite(false);
                            }
                          }}
                        />
                      </Styled.CalendarWrapper>
                    )}
                  />
                  <hr style={{ border: "1px solid #383A39", marginBottom: "18px" }} />{" "}
                  <Flex justify="end">
                    <Text size="textMedium" color="gray4">
                      {t("기간 미정")}
                    </Text>
                    <Styled.Checkbox
                      type="checkbox"
                      checked={app.startDateIsOpen ? app.isStartIndefinite : app.isEndIndefinite}
                      onChange={(e) => {
                        if (app.startDateIsOpen) {
                          app.setStartIsIndefinite(e.target.checked);
                          app.setValue("startDate", null);
                          app.setStartDateIsOpen.off();
                        } else if (app.endDateIsOpen) {
                          app.setEndIsIndefinite(e.target.checked);
                          app.setValue("endDate", null);
                          app.setEndDateIsOpen.off();
                        }
                      }}
                    />
                  </Flex>
                </>
              ) : null}
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
            desc={t(
              "프로젝트를 수행함에 있어 필요한 기술 스택을 선택해주세요 여러개 선택 가능해요"
            )}
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
        </LayoutContent>
      </LayoutHeader>
    </>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    const { projectId } = context.query;

    await queryClient.prefetchQuery(projectsKey.selectProject(Number(projectId)), () =>
      selectProject(Number(projectId))
    );

    return {
      props: {
        session,
        ...(await serverSideTranslations(context.locale as string, ["common", "project"]))
      }
    };
  }
);
