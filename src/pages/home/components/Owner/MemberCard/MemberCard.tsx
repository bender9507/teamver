import { useTranslation } from "next-i18next";
import { memo } from "react";
import {
  IconButton,
  PROFILE_DETAIL_MODAL,
  ProfileDetail,
  TinderCard,
  useModal
} from "~/components/Commons";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { Flex, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { BlurChip, CardContainer, Content, Gradient, Profile } from "../../Home.styles";
import type { FilterForm } from "../Owner.types";

export const MemberCard = memo(
  ({
    onAccept,
    onReject,
    onRestore,
    profile,
    filter
  }: {
    onAccept: VoidFunction;
    onReject: VoidFunction;
    onRestore: VoidFunction;
    profile: ProfileAllDataRow;
    filter: FilterForm;
  }) => {
    const { mount } = useModal();
    const { i18n } = useTranslation("home");

    const currentLanguage = i18n.language as OneOfLanguage;

    return (
      <CardContainer key={profile.id}>
        <TinderCard onConfirm={onAccept} onCancel={onReject} onRestore={onRestore}>
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

            <Flex align="end" justify="between" gap={12}>
              <Text size="textSmallBold" color="gray9" lineClamp={2} lineHeight={19}>
                {profile.introduce}
              </Text>

              <IconButton
                name="upButton"
                width={26}
                height={26}
                color="white"
                style={{ flexShrink: 0 }}
                onClick={() =>
                  mount(<ProfileDetail profile={profile} filter={filter} />, {
                    id: PROFILE_DETAIL_MODAL,
                    type: "bottom"
                  })
                }
              />
            </Flex>
          </Content>
        </TinderCard>
      </CardContainer>
    );
  }
);
