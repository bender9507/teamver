import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Avatar, Icon } from "~/components/Commons";
import { SwitchCase } from "~/components/Utils";
import { routes } from "~/constants/routes";
import type { ChatRoomAllData } from "~/states/server/chat";
import { Flex, FlexColumn, Text } from "~/styles/mixins";
import { useChatRoomCard } from "./ChatRoomCard.hooks";

export const ChatRoomCard = ({ room }: { room: ChatRoomAllData }) => {
  const app = useChatRoomCard({ room });
  const { t } = useTranslation("chat");

  return (
    <Link href={{ pathname: routes.chatRoom, query: { roomId: room.id } }}>
      <Flex align="center" justify="between" gap={8}>
        <Avatar src={app.opponent.imageUrl} />

        <FlexColumn gap={6} flex={1}>
          <Text size="textMediumBold">{app.opponent.name}</Text>

          <Text size="textMedium" color="gray9">
            <SwitchCase
              value={app.lastMessage?.type ?? "MESSAGE"}
              caseBy={{
                EMOJI: <>{t("이모티콘")}</>,
                REPOSITORY: <>{t("레파지토리")}</>,
                NOTICE: <>{t(app.lastMessage?.message)}</>,
                MESSAGE: <>{t(app.lastMessage?.message ?? t("채팅이 시작되었습니다."))}</>
              }}
            />
          </Text>
        </FlexColumn>

        {app.lastMessage?.sender.id === app.opponent.id && !app.lastMessage.state && (
          <Icon name="circle" />
        )}
      </Flex>
    </Link>
  );
};
