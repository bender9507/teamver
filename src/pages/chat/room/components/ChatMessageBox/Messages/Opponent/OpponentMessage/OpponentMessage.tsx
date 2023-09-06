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
  return (
    <OpponentBox message={message} isChaining={isChaining}>
      <Styled.Bubble>dddd</Styled.Bubble>
    </OpponentBox>
  );
};
