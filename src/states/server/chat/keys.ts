import type { selectChatRequests } from "./apis";

const CHAT_KEY = "CHAT";

export const chatKeys = {
  selectChatRequests: (requests: Parameters<typeof selectChatRequests>[0]) =>
    [CHAT_KEY, "selectChatRequests", requests.requesterId, requests.state] as const,
  selectChatMessages: (roomId: number) => [CHAT_KEY, "selectChatMessages", roomId] as const,
  selectChatRooms: (userId: string) => [CHAT_KEY, "selectChatRooms", userId] as const
} as const;
