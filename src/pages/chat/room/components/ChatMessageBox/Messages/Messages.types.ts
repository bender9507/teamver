import type { ChatMessageData } from "~/states/server/chat";

export interface OpponentProps {
  message: ChatMessageData;
  showProfile: boolean;
  showTime: boolean;
}

export interface MyProps {
  message: ChatMessageData;
  showTime: boolean;
}
