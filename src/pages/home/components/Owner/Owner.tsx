import { useTranslation } from "next-i18next";
import { Icon, IconButton, ProfileDetail, TinderCard } from "~/components/Commons";
import { PROFILE_DETAIL_MODAL } from "~/components/Commons/ProfileDetail";
import { Flex, Position, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import {
  FILTER_AREA_MODAL,
  FILTER_LANGUAGE_MODAL,
  FILTER_POSITION_MODAL,
  FILTER_SKILL_MODAL,
  FilterArea,
  FilterLanguage,
  FilterPosition,
  FilterSkill
} from "../Filters";
import {
  BlurChip,
  CardContainer,
  Container,
  Content,
  Gradient,
  OptionButton,
  Profile,
  Select
} from "../Home.styles";
import { useOwner } from "./Owner.hook";

export const Owner = () => {
  const app = useOwner();
  const { t, i18n } = useTranslation("home");

  const currentLanguage = i18n.language as OneOfLanguage;

  return (
    <Container>
      <Select>
        <OptionButton
          isSelected={app.filter.languages.length > 0}
          onClick={() =>
            app.mount(
              <FilterLanguage
                selectedLanguages={app.filter.languages}
                onSubmit={(languages) => app.handleChangeFilter("languages", languages)}
              />,
              { id: FILTER_LANGUAGE_MODAL, type: "bottom" }
            )
          }
        >
          {t("주요 언어")}
          <Icon name="arrowDown" width={20} height={20} />
        </OptionButton>

        <OptionButton
          isSelected={app.filter.skills.length > 0}
          onClick={() =>
            app.mount(
              <FilterSkill
                selectedSkills={app.filter.skills}
                onSubmit={(skills) => app.handleChangeFilter("skills", skills)}
              />,
              { id: FILTER_SKILL_MODAL, type: "bottom" }
            )
          }
        >
          {t("사용 기술")}
          <Icon name="arrowDown" width={20} height={20} />
        </OptionButton>

        <OptionButton
          isSelected={app.filter.positions.length > 0}
          onClick={() =>
            app.mount(
              <FilterPosition
                selectedPositions={app.filter.positions}
                onSubmit={(positions) => app.handleChangeFilter("positions", positions)}
              />,
              { id: FILTER_POSITION_MODAL, type: "bottom" }
            )
          }
        >
          {t("포지션")}
          <Icon name="arrowDown" width={20} height={20} />
        </OptionButton>

        <OptionButton
          isSelected={app.filter.areas.length > 0}
          onClick={() =>
            app.mount(
              <FilterArea
                selectedAreas={app.filter.areas}
                onSubmit={(areas) => app.handleChangeFilter("areas", areas)}
              />,
              { id: FILTER_AREA_MODAL, type: "bottom" }
            )
          }
        >
          {t("활동 지역")}
          <Icon name="arrowDown" width={20} height={20} />
        </OptionButton>
      </Select>

      <Position position="relative">
        {app.filteredRandomProfiles.map((profile) => (
          <CardContainer key={profile.id}>
            <TinderCard
              onConfirm={() => app.handleAccept(profile.id)}
              onCancel={() => app.handleReject(profile.id)}
              onRestore={app.handleRestore}
            >
              <Profile src={profile.imageUrl} alt="프로필 사진" fill sizes="100%" priority />

              <Gradient />

              <Content>
                <Flex gap={12}>
                  {profile.personalities.map((personality) => (
                    <BlurChip key={personality.id}>{personality[currentLanguage]}</BlurChip>
                  ))}
                </Flex>

                <Text size="titleMedium" ellipsis>
                  {profile.name}
                </Text>

                <Flex align="end" justify="between" gap={18}>
                  <Text size="textSmallBold" color="gray9" lineClamp={2}>
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
              </Content>
            </TinderCard>
          </CardContainer>
        ))}
      </Position>
    </Container>
  );
};
