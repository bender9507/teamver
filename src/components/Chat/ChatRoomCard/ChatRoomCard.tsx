import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, Icon } from "~/components/Commons";
import { routes } from "~/constants/routes";
import type { ChatRoomAllData } from "~/states/server/chat";
import { Flex, FlexColumn, Text } from "~/styles/mixins";

export const ChatRoomCard = ({ id, members, messages }: ChatRoomAllData) => {
  const { t } = useTranslation("chat");

  const opponent = members[0];

  return (
    <Link href={{ pathname: routes.chatRoom, query: { roomId: id } }}>
      <Flex align="center" justify="between" gap={8}>
        <Avatar src={opponent.imageUrl} />

        <FlexColumn gap={6} flex={1}>
          <Text size="textMediumBold">{opponent.name}</Text>

          <Text size="textMedium" color="gray9">
            {messages[0]?.message ?? t("채팅이 시작되었습니다.")}
          </Text>
        </FlexColumn>
        {messages[0].sender.id === opponent.id && !messages[0].state && <Icon name="circle" />}
      </Flex>
    </Link>
  );
};
