import type { selectChatRequests, selectChatRequestsOwner } from "./apis";

const CHAT_KEY = "CHAT";

export const chatKeys = {
  selectChatRequests: (requests: Parameters<typeof selectChatRequests>[0]) =>
    [CHAT_KEY, "selectChatRequests", requests.receiverId, requests.state] as const,
  selectChatRequestOwner: (requests: Parameters<typeof selectChatRequestsOwner>[0]) =>
    [CHAT_KEY, "selectChatRequestsOnLike", requests.requesterId, requests.state] as const,
  selectChatMessages: (roomId: number) => [CHAT_KEY, "selectChatMessages", roomId] as const,
  selectChatRooms: (userId: string) => [CHAT_KEY, "selectChatRooms", userId] as const
} as const;
