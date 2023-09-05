import { useTranslation } from "next-i18next";
import { Avatar, IconButton, PreviousButton } from "~/components/Commons";
import { Flex, LayoutHeaderWithNav, Text } from "~/styles/mixins";
import { ChatMessageBox } from "../ChatMessageBox";
import { ChatMessageSend } from "../ChatMessageSend";
import { ChatHeader } from "../Room.styles";
import { Invite } from "./Invite";
import { useChatRoomOwner } from "./Owner.hooks";

export const Owner = () => {
  const app = useChatRoomOwner();
  const { t } = useTranslation("chat");

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
                message: <Invite user={app.user} onChange={app.handleChangeProject} />
              })
            ) {
              app.handleInvite();
            }
          }}
        />
        <IconButton name="moreVertical" />
      </ChatHeader>

      <ChatMessageBox opponent={app.opponent} />

      <ChatMessageSend opponent={app.opponent} />
    </LayoutHeaderWithNav>
  );
};
