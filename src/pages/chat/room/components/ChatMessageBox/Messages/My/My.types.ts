import type { ChatMessageData } from "~/states/server/chat";

export interface MyProps {
  message: ChatMessageData;
  isChainingEnd: boolean;
}
