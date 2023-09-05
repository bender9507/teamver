import { FlexCenter, Text } from "~/styles/mixins";
import { useChatHeaderMore } from "./ChatHeaderMore.hooks";

export const CHAT_HEADER_MORE_MODAL = "CHAT_HEADER_MORE_MODAL";

export const ChatHeaderMore = () => {
  const app = useChatHeaderMore();

  return (
    <FlexCenter direction="column" padding="72px" gap={37}>
      <Text size="buttonMedium">신고하기</Text>

      <Text size="buttonMedium" onClick={app.handleDeleteChatMember}>
        채팅방 나가기
      </Text>
    </FlexCenter>
  );
};
