import { Avatar, IconButton, PreviousButton } from "~/components/Commons";
import { Flex, LayoutHeaderWithNav, Text } from "~/styles/mixins";
import { ChatMessageBox } from "../ChatMessageBox";
import { ChatMessageSend } from "../ChatMessageSend";
import { ChatHeader } from "../ChatRoom.styles";
import { useChatRoomMember } from "./ChatRoomMember.hooks";

export const ChatRoomMember = () => {
  const app = useChatRoomMember();

  return (
    <LayoutHeaderWithNav>
      <ChatHeader>
        <PreviousButton />

        <Flex align="center" flex={1} gap={8}>
          <Avatar size="small" src={app.opponent.imageUrl} />

          <Text>{app.opponent.name}</Text>
        </Flex>

        <IconButton name="moreVertical" />
      </ChatHeader>

      <ChatMessageBox user={app.user} opponent={app.opponent} />

      <ChatMessageSend user={app.user} opponent={app.opponent} />
    </LayoutHeaderWithNav>
  );
};
