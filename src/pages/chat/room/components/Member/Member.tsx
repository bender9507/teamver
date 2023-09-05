import { Avatar, IconButton, PreviousButton } from "~/components/Commons";
import { Flex, LayoutHeaderWithNav, Text } from "~/styles/mixins";
import { CHAT_HEADER_MORE_MODAL, ChatHeaderMore } from "../ChatHeaderMore";
import { ChatMessageBox } from "../ChatMessageBox";
import { ChatMessageSend } from "../ChatMessageSend";
import { ChatHeader } from "../Room.styles";
import { useChatRoomMember } from "./Member.hooks";

export const Member = () => {
  const app = useChatRoomMember();

  return (
    <LayoutHeaderWithNav>
      <ChatHeader>
        <PreviousButton />

        <Flex align="center" flex={1} gap={8}>
          <Avatar size="small" src={app.opponent.imageUrl} />

          <Text>{app.opponent.name}</Text>
        </Flex>

        <IconButton
          name="moreVertical"
          onClick={() =>
            app.mount(<ChatHeaderMore />, { id: CHAT_HEADER_MORE_MODAL, type: "bottom" })
          }
        />
      </ChatHeader>

      <ChatMessageBox opponent={app.opponent} />

      <ChatMessageSend opponent={app.opponent} />
    </LayoutHeaderWithNav>
  );
};
