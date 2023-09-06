import type { ChatMessageData } from "~/states/server/chat";
import { OpponentBox } from "../OpponentBox";
import * as Styled from "./OpponentMessage.styles";

export const OpponentMessage = ({
  message,
  isChaining
}: {
  message: ChatMessageData;
  isChaining: boolean;
}) => {
  const { message: content } = message;

  return (
    <OpponentBox message={message} isChaining={isChaining}>
      <Styled.Bubble>{content}</Styled.Bubble>
    </OpponentBox>
  );
};
