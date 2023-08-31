import type { selectChatRequestsMember, selectChatRequestsOwner } from "./apis";

const CHAT_KEY = "CHAT";

export const chatKeys = {
  selectChatRequestsMember: (requests: Parameters<typeof selectChatRequestsMember>[0]) =>
    [CHAT_KEY, "selectChatRequests", requests.requesterId, requests.state] as const,
  selectChatRequestsOwner: (requests: Parameters<typeof selectChatRequestsOwner>[0]) =>
    [CHAT_KEY, "selectChatRequestsOwner", requests.requesterId, requests.state] as const,
  selectChatMessages: (roomId: number) => [CHAT_KEY, "selectChatMessages", roomId] as const,
  selectChatRooms: (userId: string) => [CHAT_KEY, "selectChatRooms", userId] as const
} as const;
