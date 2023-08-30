import type { selectChatRequestMember, selectChatRequestOwner } from "./apis";

const CHAT_KEY = "CHAT";

export const chatKeys = {
  selectChatRequestOwner: (requests: Parameters<typeof selectChatRequestOwner>[0]) =>
    [CHAT_KEY, "selectChatRequestOwner", requests.receiverId, requests.state] as const,

  selectChatRequestMember: (requests: Parameters<typeof selectChatRequestMember>[0]) =>
    [CHAT_KEY, "selectChatRequestMember", requests.receiverId, requests.state] as const,

  selectChatMessages: (roomId: number) => [CHAT_KEY, "selectChatMessages", roomId] as const,

  selectChatRooms: (userId: string) => [CHAT_KEY, "selectChatRooms", userId] as const
} as const;
