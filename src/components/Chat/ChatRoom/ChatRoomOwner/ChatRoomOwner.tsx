import { useTranslation } from "next-i18next";
import type { ComponentProps } from "react";
import { Avatar, IconButton, PreviousButton } from "~/components/Commons";
import type ChatRoom from "~/pages/chat/room/index.page";
import { Flex, LayoutHeaderWithNav, Text } from "~/styles/mixins";
import { ChatMessageBox } from "../ChatMessageBox";
import { ChatMessageSend } from "../ChatMessageSend";
import { ChatHeader } from "../ChatRoom.styles";
import { useChatRoomOwner } from "./ChatRoomOwner.hooks";
import { Invite } from "./Invite";

export const ChatRoomOwner = (props: ComponentProps<typeof ChatRoom>) => {
  const app = useChatRoomOwner(props);
  const { t } = useTranslation();

  return (
    <LayoutHeaderWithNav>
      <ChatHeader>
        <PreviousButton />

        <Flex align="center" flex={1} gap={8}>
          <Avatar size="small" src={app.opponent.imageUrl} />

          <Text>{app.opponent.name}</Text>
        </Flex>

        <IconButton
          name="invite"
          onClick={async () => {
            if (
              await app.confirm({
                title: t("어떤 프로젝트에 초대할까요"),
                message: <Invite user={props.user} onChange={app.handleChangeProject} />
              })
            ) {
              app.handleInvite();
            }
          }}
        />
        <IconButton name="moreVertical" />
      </ChatHeader>

      <ChatMessageBox user={props.user} opponent={app.opponent} />

      <ChatMessageSend user={props.user} />
    </LayoutHeaderWithNav>
  );
};
