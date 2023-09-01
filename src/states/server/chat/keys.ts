import type {
  selectChatRequestMember,
  selectChatRequestOwner,
  selectChatRequestsMember,
  selectChatRequestsOwner,
  selectChatRoom
} from "./apis";

const CHAT_KEY = "CHAT";

export const chatKeys = {
  selectChatRequestsMember: (requests: Parameters<typeof selectChatRequestsMember>[0]) =>
    [CHAT_KEY, "selectChatRequests", requests.requesterId, requests.state] as const,

  selectChatRequestsOwner: (requests: Parameters<typeof selectChatRequestsOwner>[0]) =>
    [CHAT_KEY, "selectChatRequestsOwner", requests.requesterId, requests.state] as const,

  selectChatRequestOwner: (requests: Parameters<typeof selectChatRequestOwner>[0]) =>
    [CHAT_KEY, "selectChatRequestOwner", requests.receiverId, requests.state] as const,

  selectChatRequestMember: (requests: Parameters<typeof selectChatRequestMember>[0]) =>
    [CHAT_KEY, "selectChatRequestMember", requests.receiverId, requests.state] as const,

  selectUnreadMessageCount: (requests: { userId: string; roomId: number }) =>
    [CHAT_KEY, "selectUnreadMessageCount", requests.userId, requests.roomId] as const,

  selectChatMessages: (roomId: number) => [CHAT_KEY, "selectChatMessages", roomId] as const,

  selectChatRooms: (userId: string) => [CHAT_KEY, "selectChatRooms", userId] as const,

  selectChatRoom: (params: Parameters<typeof selectChatRoom>[0]) =>
    [CHAT_KEY, "selectChatRoom", params.roomId, params.userId] as const
} as const;
