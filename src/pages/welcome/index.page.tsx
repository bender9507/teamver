import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, IconButton, Input, OptionChip, Textarea } from "~/components/Commons";
import { HTTP_REGEX } from "~/constants/regex";
import { Flex, FlexColumn, Grid, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { steps } from "./welcome.constants";
import { useWelcome } from "./welcome.hooks";
import * as Styled from "./welcome.styles";

const Welcome = () => {
  const app = useWelcome();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Styled.Container onSubmit={app.handleSubmit(app.handleCreateProfile)}>
      <Styled.Header>
        <IconButton name="arrowBack" color="content1" onClick={app.prevStep} />
      </Styled.Header>

      <Styled.Progress current={app.step} max={steps.length - 1} />

      <SizeBox height={26} />

      <Styled.SectionDisplay>
        <Styled.SectionContainer step={app.step}>
          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                팀버에서만의 닉네임을
                <br />
                만들어보세요!
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                프로필에 표시되는 소개글로, 언제든 변경 가능해요!
              </Text>
            </FlexColumn>

            <FlexColumn gap={14}>
              <Input onChange={app.validateNickName} maxLength={16} placeholder="닉네임" />

              <Flex style={{ marginLeft: "18px" }}>
                {!app.successMessage && !app.errorMessage && (
                  <Text color="gray4" size="paragraph3">
                    최대 16글자
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
                멋진 소개글을 적어볼까요?
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                프로필에 표시되는 소개글로, 언제든 변경 가능해요!
              </Text>
            </FlexColumn>

            <FlexColumn gap={14}>
              <Textarea
                {...app.register("introduce", { required: true, maxLength: 500 })}
                maxLength={500}
                placeholder="내 소개"
              />

              <Text color="gray4" size="paragraph3" style={{ marginLeft: "18px" }}>
                최대 500자
              </Text>
            </FlexColumn>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                사용하는 주요 언어를
                <br />
                선택해 볼까요?
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                여러 개 선택 할 수 있어요!
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.languages.map((language) => (
                <OptionChip
                  key={language.id}
                  onChange={(event) => app.onChange.languageFields(event, language)}
                >
                  {language.name}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                사용하는 기술 스택을
                <br />
                선택해 볼까요?
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                여러 개 선택 할 수 있어요!
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.skills.map((skill) => (
                <OptionChip
                  key={skill.id}
                  onChange={(event) => app.onChange.skillFields(event, skill)}
                >
                  {skill.name}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                나의 포지션을 선택해볼까요?
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                여러 개 선택 할 수 있어요!
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.positions.map((position) => (
                <OptionChip
                  key={position.id}
                  onChange={(event) => app.onChange.positionFields(event, position)}
                >
                  {position[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                도전해 보고 싶은 프로젝트
                <br />
                타입을 선택해볼까요?
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                여러 개 선택 할 수 있어요!
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.projectTypes.map((projectType) => (
                <OptionChip
                  key={projectType.id}
                  onChange={(event) => app.onChange.projectTypeFields(event, projectType)}
                >
                  {projectType[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                나를 잘 나타내는
                <br />
                키워드를 선택해볼까요?
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                최대 두 개까지 선택할 수 있어요!
              </Text>
            </FlexColumn>

            <Flex gap={12} wrap="wrap">
              {app.constants.personalities.map((personality) => (
                <OptionChip
                  key={personality.id}
                  onChange={(event) => app.onChange.personalityFields(event, personality)}
                >
                  {personality[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <FlexColumn gap={16}>
              <Text as="h3" size="heading3">
                주로 활동하는 지역은
                <br />
                어디인가요?
              </Text>

              <Text as="p" size="paragraph3" color="gray2">
                여러 개 선택 할 수 있어요!
              </Text>
            </FlexColumn>

            <Grid gap={12} column={5}>
              {app.constants.areas.map((area) => (
                <OptionChip
                  key={area.id}
                  onChange={(event) => app.onChange.areaFields(event, area)}
                >
                  {area[currentLanguage]}
                </OptionChip>
              ))}
            </Grid>
          </Styled.Section>

          <Styled.Section>
            <Text as="h3" size="heading3">
              운영 블로그가 있다면
              <br />
              알려주세요!
            </Text>

            <Input
              {...app.register("blog", {
                pattern: HTTP_REGEX
              })}
              placeholder="블로그 주소"
            />
          </Styled.Section>

          <Styled.Section>
            <Text as="h3" size="heading3">
              거의 다 왔어요!
              <br />
              어떤 일을 하고 계시나요?
            </Text>

            <Flex gap={12} wrap="wrap">
              {app.constants.jobs.map((job) => (
                <OptionChip key={job.id} onChange={(event) => app.onChange.jobFields(event, job)}>
                  {job[currentLanguage]}
                </OptionChip>
              ))}
            </Flex>
          </Styled.Section>

          <Styled.Section>
            <Text as="h3" size="heading3">
              마지막으로 나를 나타낼 수 있는 프로필 사진을 올려볼까요?
            </Text>
          </Styled.Section>

          <Styled.Section>
            <Text as="h3" size="heading3">
              환영합니다!
              <br />
              회원님은 프로젝트의
              <br />
              모집자인가요, 참가자인가요?
            </Text>
          </Styled.Section>
        </Styled.SectionContainer>
      </Styled.SectionDisplay>

      <Button disabled={app.isDisabled} onClick={app.nextStep}>
        다음
      </Button>
    </Styled.Container>
  );
};

export default Welcome;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"]))
    }
  };
};
