import { useTranslation } from "next-i18next";
import { Icon, TinderCard } from "~/components/Commons";
import { PosCenter, Position, Text } from "~/styles/mixins";
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
import { CardContainer, Container, OptionButton, Select } from "../Home.styles";
import { MemberCard } from "./MemberCard";
import { useOwner } from "./Owner.hook";

export const Owner = () => {
  const app = useOwner();
  const { t } = useTranslation("home");

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
        <CardContainer>
          <TinderCard mode="inactive">
            <PosCenter>
              <Text size="textMediumBold" color="gray6">
                {t("등록된 참가자가 없어요")}
              </Text>
            </PosCenter>
          </TinderCard>
        </CardContainer>

        {app.filteredRandomProfiles.map((profile) => (
          <MemberCard
            key={profile.id}
            onAccept={() => app.handleAccept(profile.id)}
            onReject={() => app.handleReject(profile.id)}
            onRestore={app.handleRestore}
            profile={profile}
            filter={app.filter}
          />
        ))}
      </Position>
    </Container>
  );
};
