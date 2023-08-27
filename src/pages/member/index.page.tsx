import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Icon, RadioChip, TinderCard } from "~/components/Commons";
import { MemberNavbarLayout } from "~/components/Layouts";
import { Flex, FlexColumn, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useMember } from "./member.hooks";
import * as Styled from "./member.styles";

const Member = () => {
  const app = useMember();
  const { t, i18n } = useTranslation("memberHome");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <MemberNavbarLayout>
      <Styled.Container>
        <Flex>
          <Styled.TypeButton
            onClick={() =>
              app.mount(
                <FlexColumn as="form" onSubmit={app.handleSubmit(app.handleChangeProjectType)}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">어떤 프로젝트를 찾으시나요?</Text>
                    <Text size="paragraph3">도전해보고 싶은 프로젝트 타입을 선택해주세요!</Text>
                  </FlexColumn>

                  <SizeBox height={50} />

                  <Flex gap={12} wrap="wrap">
                    {app.constants.projectTypes.map((projectType) => (
                      <RadioChip
                        {...app.register("projectType")}
                        key={projectType.id}
                        color="backgroundPrimary"
                        value={projectType.id}
                      >
                        {projectType[currentLanguage]}
                      </RadioChip>
                    ))}
                  </Flex>

                  <SizeBox height={60} />

                  <Button>확인</Button>
                </FlexColumn>,
                { id: "selectProjectType", type: "bottom" }
              )
            }
          >
            {app.selectedProjectType ? app.selectedProjectType[currentLanguage] : "프로젝트 타입"}
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>
        </Flex>

        <TinderCard onConfirm={() => console.log("confirm")} onCancel={() => console.log("cancel")}>
          <Styled.Profile
            src="https://knjzcsrhngnomfeoymis.supabase.co/storage/v1/object/public/profileImages/g123_1693107111237"
            alt="프로필 사진"
            fill
          />

          <Styled.Gradient />

          <Styled.Content>
            <FlexColumn gap={12}>
              <Flex>
                <Styled.BlurChip>사이드 프로젝트</Styled.BlurChip>
              </Flex>

              <Text size="heading4">뮤즈 플랫폼 프로젝트</Text>

              <Text size="paragraph3" color="gray1">
                뮤즈들을 위한 고음질 음악 서비스를 만들고 있는데 함께 하실 웃음 부자 개발자 찾아요~
              </Text>
            </FlexColumn>
          </Styled.Content>
        </TinderCard>
      </Styled.Container>
    </MemberNavbarLayout>
  );
};

export default Member;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["welcome"]))
    }
  };
};
