import type { User } from "@supabase/supabase-js";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, Icon } from "~/components/Commons";
import { routes } from "~/constants/routes";
import type { ChatRoomAllData } from "~/states/server/chat";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useChatRoomCard } from "./ChatRoomCard.hooks";

export const ChatRoomCard = ({ room, user }: { room: ChatRoomAllData; user: User }) => {
  const app = useChatRoomCard({ room, user });
  const { t } = useTranslation("chat");

  return (
    <Link href={{ pathname: routes.chatRoom, query: { roomId: room.id } }}>
      <Flex align="center" justify="between" gap={8}>
        <Avatar src={app.opponent.imageUrl} />

        <FlexColumn gap={6} flex={1}>
          <Text size="textMediumBold">{app.opponent.name}</Text>

          <Text size="textMedium" color="gray9">
            {app.lastMessage?.message ?? t("채팅이 시작되었습니다.")}
          </Text>
        </FlexColumn>

        {app.lastMessage?.sender.id === app.opponent.id && !app.lastMessage.state && (
          <Icon name="circle" />
        )}
      </Flex>
    </Link>
  );
};
