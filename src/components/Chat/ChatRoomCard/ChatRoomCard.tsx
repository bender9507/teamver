import { useTranslation } from "next-i18next";
import { Avatar } from "~/components/Commons";
import type { ChatRoomAllData } from "~/states/server/chat";
import { Flex, FlexColumn, Text } from "~/styles/mixins";

export const ChatRoomCard = ({ members, messages }: ChatRoomAllData) => {
  const { t } = useTranslation("chat");

  const opponent = members[0];

  return (
    <Flex align="center" gap={8}>
      <Avatar src={opponent.imageUrl} />

      <FlexColumn gap={6}>
        <Text size="textMediumBold">{opponent.name}</Text>

        <Text size="textMedium" color="gray9">
          {messages[0]?.message ?? t("채팅이 시작되었습니다.")}
        </Text>
      </FlexColumn>
    </Flex>
  );
};
