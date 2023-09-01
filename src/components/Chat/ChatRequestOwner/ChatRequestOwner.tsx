import type { User } from "@supabase/auth-helpers-nextjs";
import { useTranslation } from "next-i18next";
import { Avatar, Button, ProfileDetail, useModal } from "~/components/Commons";
import { PROFILE_DETAIL_MODAL } from "~/components/Commons/ProfileDetail";
import type {
  ConstantAreaRow,
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantSkillRow
} from "~/states/server/constant";
import type { ProfileAllDataRow } from "~/states/server/profile";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useChatRequestOwner } from "./ChatRequestOwner.hooks";
import * as Styled from "./ChatRequestOwner.styles";

export const ChatRequestOwner = ({ user }: { user: User }) => {
  const { t } = useTranslation("chat");

  const app = useChatRequestOwner(user.id);

  const { mount } = useModal();

  const handleOpenProfileDetail = ({
    profile,
    filter
  }: {
    profile: ProfileAllDataRow;
    filter: {
      positions: ConstantPositionRow["id"][];
      languages: ConstantLanguageRow["id"][];
      skills: ConstantSkillRow["id"][];
      areas: ConstantAreaRow["id"][];
    };
  }) => {
    mount(<ProfileDetail profile={profile} filter={filter} />, {
      id: PROFILE_DETAIL_MODAL,
      type: "bottom"
    });
  };

  return (
    <FlexColumn>
      <FlexColumn gap={18}>
        {app.requests.length === 0 ? (
          <Styled.NoRequestBox>
            <Text>{t("받은 채팅 요청이 없어요.")}</Text>
          </Styled.NoRequestBox>
        ) : (
          <Styled.ChatRequestListContainer>
            {app.requests.map((request) => (
              <Flex key={request.id} justify="between" align="center">
                <Styled.UserBox
                  onClick={() =>
                    handleOpenProfileDetail({
                      profile: request.requesterProfile,
                      filter: request.filteredProfiles
                    })
                  }
                >
                  <Avatar src={request.imageUrl} />
                  <Text>{request.name}</Text>
                </Styled.UserBox>

                <Flex gap={12}>
                  <Button
                    size="small"
                    color="content2"
                    bgColor="gray2"
                    onClick={() =>
                      app.handleAcceptClick({
                        id: request.id,
                        requesterId: request.requesterId,
                        receiverId: user.id
                      })
                    }
                  >
                    {t("수락")}
                  </Button>
                  <Button
                    size="small"
                    color="content2"
                    bgColor="gray2"
                    onClick={() => app.handleDenyClick(request.id)}
                  >
                    {t("삭제")}
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Styled.ChatRequestListContainer>
        )}
      </FlexColumn>
    </FlexColumn>
  );
};
