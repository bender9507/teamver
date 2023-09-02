import { useTranslation } from "next-i18next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { routes } from "~/constants/routes";
import type Chat from "~/pages/chat/index.page";
import { Flex, FlexColumn, PosCenter, Text } from "~/styles/mixins";
import { isEmpty } from "~/utils";
import { ChatRoomCard } from "../ChatRoomCard";
import { useChatOwner } from "./ChatOwner.hooks";

export const ChatOwner = (props: ComponentProps<typeof Chat>) => {
  const app = useChatOwner(props);
  const { t } = useTranslation("chat");

  return (
    <FlexColumn>
      <Flex align="center" justify="end" style={{ height: "44px" }}>
        <Link href={routes.chatRequest}>
          <Text size="textMedium" color="primary">
            {t("요청 N개", { count: app.requests.length })}
          </Text>
        </Link>
      </Flex>

      {isEmpty(app.rooms) && (
        <PosCenter>
          <Text size="textMediumBold" color="gray6">
            {t("진행중인 채팅이 없어요")}
          </Text>
        </PosCenter>
      )}

      <FlexColumn gap={12}>
        {app.rooms.map((room) => (
          <ChatRoomCard key={room.id} user={props.user} room={room} />
        ))}
      </FlexColumn>
    </FlexColumn>
  );
};
