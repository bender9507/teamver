import { type PropsWithChildren } from "react";
import type { ChatMessageData } from "~/states/server/chat";
import { MyBox } from "../MyBox";
import * as Styled from "./MyMessage.styles";

export const MyMessage = ({ message }: PropsWithChildren<{ message: ChatMessageData }>) => {
  const { message: content } = message;

  return (
    <MyBox message={message}>
      <Styled.Bubble>{content}</Styled.Bubble>
    </MyBox>
  );
};
