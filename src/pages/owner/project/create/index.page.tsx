import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Controller } from "react-hook-form";
import {
  Button,
  CheckboxChip,
  Icon,
  ImageUploader,
  Input,
  PreviousButton,
  RadioChip,
  Textarea
} from "~/components/Commons";
import { Flex, FlexColumn, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useCreate } from "./create.hooks";
import * as Styled from "./create.styles";

const Create = (props: { user: User }) => {
  const app = useCreate(props);
  const { t, i18n } = useTranslation("projectCreate");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <>
      <Styled.Header>
        <PreviousButton />
        <Text>프로젝트 생성하기</Text>
      </Styled.Header>

      <Styled.Container as="form" gap={32} onSubmit={app.handleSubmit(app.handleCreateProject)}>
        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 이미지</Text>

          <Flex>
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
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 이름</Text>

          <FlexColumn gap={8}>
            <Input
              placeholder="프로젝트 이름"
              maxLength={16}
              {...app.register("name", { required: true, maxLength: 16 })}
            />

            <Styled.Desc size="paragraph3" color="gray4">
              최대 16자
            </Styled.Desc>
          </FlexColumn>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 타입</Text>

          <Flex gap={12} wrap="wrap">
            {app.constants.projectTypes.map((projectType) => (
              <RadioChip
                key={projectType.id}
                value={projectType.id}
                chipProps={{
                  isSelected: Number(app.watch("projectType")) === projectType.id
                }}
                {...app.register("projectType", { required: true })}
              >
                {projectType[currentLanguage]}
              </RadioChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 소개</Text>

          <FlexColumn gap={8}>
            <Textarea
              placeholder="프로젝트 소개"
              maxLength={500}
              {...app.register("description", { required: true, maxLength: 500 })}
            />

            <Styled.Desc size="paragraph3" color="gray4">
              최대 500자
            </Styled.Desc>
          </FlexColumn>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">모집 포지션</Text>

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
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">모집 인원</Text>

          <Flex gap={12} align="center" wrap="wrap">
            <Input
              placeholder="모집 인원"
              type="number"
              max={100000}
              {...app.register("recruitCount", { required: true, max: 100000 })}
            />
            <Text>명</Text>
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 기간</Text>

          <FlexColumn gap={8}>
            <Text>Start Date</Text>

            <FlexColumn gap={12}>
              <Input
                placeholder="시작일"
                readOnly
                value={
                  app.watch("startDate") ? dayjs(app.watch("startDate")).format("DD. MM. YYYY") : ""
                }
                onClick={app.setStartDateIsOpen.toggle}
              />

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
                        formatDay={(locale, date) => dayjs(date).format("D")}
                        onChange={(date) => {
                          app.setStartDateIsOpen.off();
                          onChange(date);
                        }}
                      />
                    </Styled.CalendarWrapper>
                  )}
                />
              )}
            </FlexColumn>
          </FlexColumn>

          <FlexColumn gap={8}>
            <Text>Due Date</Text>

            <FlexColumn gap={12}>
              <Input
                placeholder="종료일"
                readOnly
                value={
                  app.watch("endDate") ? dayjs(app.watch("endDate")).format("DD. MM. YYYY") : ""
                }
                onClick={app.setEndDateIsOpen.toggle}
              />

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
          </FlexColumn>
        </FlexColumn>

        <FlexColumn gap={16}>
          <FlexColumn gap={12}>
            <Text size="heading4">주요 언어</Text>
            <Text size="paragraph3">프로젝트에 필요한 주요 언어를 선택해주세요!</Text>
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
        </FlexColumn>

        <FlexColumn gap={16}>
          <FlexColumn gap={12}>
            <Text size="heading4">기술 스택</Text>
            <Text size="paragraph3">프로젝트를 수행함에 있어 필요한 기술 스택을 선택해주세요!</Text>
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
        </FlexColumn>

        <SizeBox height={32} />

        <Button type="submit">저장</Button>
      </Styled.Container>
    </>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { session }
  } = await supabaseServer.auth.getSession();

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
      ...(await serverSideTranslations(context.locale, ["projectCreate"]))
    }
  };
};
