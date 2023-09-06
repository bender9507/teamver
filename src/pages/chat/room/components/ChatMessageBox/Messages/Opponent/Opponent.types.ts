import type { ChatMessageData } from "~/states/server/chat";

export interface OpponentProps {
  message: ChatMessageData;
  isChaining: boolean;
  isChainingEnd: boolean;
}
