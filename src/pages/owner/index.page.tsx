import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Button,
  Icon,
  IconButton,
  ProfileDetail,
  SelectChip,
  TinderCard
} from "~/components/Commons";
import { PROFILE_DETAIL_MODAL } from "~/components/Commons/ProfileDetail";
import { OwnerNavbarLayout } from "~/components/Layouts";
import { routes } from "~/constants/routes";
import { Flex, FlexColumn, Grid, Position, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useOwner } from "./owner.hook";
import * as Styled from "./owner.styles";

const Owner = ({ user }: { user: User }) => {
  const app = useOwner({ user });
  const { t, i18n } = useTranslation("ownerHome");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <OwnerNavbarLayout>
      <Styled.Container>
        <Styled.FilterList>
          <Styled.TypeButton
            isSelected={app.filter.languages.length > 0}
            onClick={() =>
              app.mount(
                <Styled.FilterContainer as="form" onSubmit={app.handleChangeFilter}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">{t("어떤 주요 언어가 필요한가요")}</Text>
                    <Text size="paragraph3">{t("프로젝트에 필요한 주요 언어를 선택해주세요")}</Text>
                  </FlexColumn>

                  <SizeBox height={52} />

                  <Flex gap={12} wrap="wrap">
                    {app.constants.languages.map((language) => (
                      <SelectChip
                        key={language.id}
                        value={language.id}
                        color="backgroundPrimary"
                        {...app.register("languages")}
                      >
                        {language.name}
                      </SelectChip>
                    ))}
                  </Flex>

                  <SizeBox height={60} />

                  <Button>확인</Button>
                </Styled.FilterContainer>,
                { id: "selectLanguages", type: "bottom" }
              )
            }
          >
            {t("주요 언어")}
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>

          <Styled.TypeButton
            isSelected={app.filter.skills.length > 0}
            onClick={() =>
              app.mount(
                <Styled.FilterContainer as="form" onSubmit={app.handleChangeFilter}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">{t("어떤 기술 스택이 필요한가요")}</Text>

                    <Text size="paragraph3">
                      {t("프로젝트를 수행함에 있어 필요한 기술 스택을 선택해주세요")}
                    </Text>
                  </FlexColumn>

                  <SizeBox height={52} />

                  <Flex gap={12} wrap="wrap">
                    {app.constants.skills.map((skill) => (
                      <SelectChip
                        key={skill.id}
                        value={skill.id}
                        color="backgroundPrimary"
                        {...app.register("skills")}
                      >
                        {skill.name}
                      </SelectChip>
                    ))}
                  </Flex>

                  <SizeBox height={60} />

                  <Button>{t("확인")}</Button>
                </Styled.FilterContainer>,
                { id: "selectSkills", type: "bottom" }
              )
            }
          >
            {t("사용 기술")}
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>

          <Styled.TypeButton
            isSelected={app.filter.positions.length > 0}
            onClick={() =>
              app.mount(
                <Styled.FilterContainer as="form" onSubmit={app.handleChangeFilter}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">{t("어떤 포지션의 팀원을 원하시나요")}</Text>

                    <Text size="paragraph3">
                      {t("필요한 포지션을 선택해주세요 여러개 선택 가능해요")}
                    </Text>
                  </FlexColumn>

                  <SizeBox height={52} />

                  <Flex gap={12} wrap="wrap">
                    {app.constants.positions.map((position) => (
                      <SelectChip
                        key={position.id}
                        value={position.id}
                        color="backgroundPrimary"
                        {...app.register("positions")}
                      >
                        {position[currentLanguage]}
                      </SelectChip>
                    ))}
                  </Flex>

                  <SizeBox height={60} />

                  <Button>{t("확인")}</Button>
                </Styled.FilterContainer>,
                { id: "selectPositions", type: "bottom" }
              )
            }
          >
            {t("포지션")}
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>

          <Styled.TypeButton
            isSelected={app.filter.areas.length > 0}
            onClick={() =>
              app.mount(
                <Styled.FilterContainer as="form" onSubmit={app.handleChangeFilter}>
                  <FlexColumn gap={12}>
                    <Text size="heading4">{t("프로젝트 활동 지역이 어디인가요")}</Text>

                    <Text size="paragraph3">
                      {t("주로 활동하는 지역을 선택해주세요 여러개 선택 가능해요")}
                    </Text>
                  </FlexColumn>

                  <SizeBox height={52} />

                  <Grid gap={12} column={5}>
                    {app.constants.areas.map((area) => (
                      <SelectChip
                        key={area.id}
                        value={area.id}
                        color="backgroundPrimary"
                        {...app.register("areas")}
                      >
                        {area[currentLanguage]}
                      </SelectChip>
                    ))}
                  </Grid>

                  <SizeBox height={60} />

                  <Button>확인</Button>
                </Styled.FilterContainer>,
                { id: "selectLanguages", type: "bottom" }
              )
            }
          >
            {t("활동 지역")}
            <Icon name="arrowDown" width={20} height={20} />
          </Styled.TypeButton>
        </Styled.FilterList>

        <Position position="relative">
          {app.filteredRandomProfiles.map((profile) => (
            <Styled.CardContainer key={profile.id}>
              <TinderCard
                onConfirm={() => app.handleConfirm(profile.id)}
                onCancel={() => app.handleCancel(profile.id)}
              >
                <Styled.Profile
                  src={profile.imageUrl}
                  alt="프로필 사진"
                  fill
                  sizes="100%"
                  priority
                />

                <Styled.Gradient />

                <Styled.Content>
                  <FlexColumn gap={12}>
                    <Flex gap={12}>
                      {profile.personalities.map((personality) => (
                        <Styled.BlurChip key={personality.id}>
                          {personality[currentLanguage]}
                        </Styled.BlurChip>
                      ))}
                    </Flex>

                    <Text size="heading4">{profile.name}</Text>

                    <Flex align="end" justify="between" gap={18}>
                      <Text size="paragraph3" color="gray1" lineClamp={2}>
                        {profile.introduce}
                      </Text>

                      <IconButton
                        name="upButton"
                        width={26}
                        height={26}
                        color="white"
                        style={{ flexShrink: 0 }}
                        onClick={() =>
                          app.mount(<ProfileDetail profile={profile} filter={app.filter} />, {
                            id: PROFILE_DETAIL_MODAL,
                            type: "bottom"
                          })
                        }
                      />
                    </Flex>
                  </FlexColumn>
                </Styled.Content>
              </TinderCard>
            </Styled.CardContainer>
          ))}
        </Position>
      </Styled.Container>
    </OwnerNavbarLayout>
  );
};

export default Owner;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { session }
  } = await supabaseServer.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session.user,
      ...(await serverSideTranslations(context.locale, ["ownerHome"]))
    }
  };
};
