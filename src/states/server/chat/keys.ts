import type {
  selectChatRequestMember,
  selectChatRequestOwner,
  selectChatRoom,
  selectOpponent
} from "./apis";

const CHAT_KEY = "CHAT";

export const chatKeys = {
  selectChatRequestOwner: (requests: Parameters<typeof selectChatRequestOwner>[0]) =>
    [CHAT_KEY, "selectChatRequestOwner", requests.receiverId, requests.state] as const,

  selectChatRequestMember: (requests: Parameters<typeof selectChatRequestMember>[0]) =>
    [CHAT_KEY, "selectChatRequestMember", requests.receiverId, requests.state] as const,

  selectChatMessages: (roomId: number) => [CHAT_KEY, "selectChatMessages", roomId] as const,

  selectChatRooms: (userId: string) => [CHAT_KEY, "selectChatRooms", userId] as const,

  selectChatRoom: (params: Parameters<typeof selectChatRoom>[0]) =>
    [CHAT_KEY, "selectChatRoom", params.roomId, params.userId] as const,

  selectOpponent: (params: Parameters<typeof selectOpponent>[0]) =>
    [CHAT_KEY, "selectOpponent", params.roomId, params.userId] as const,

  selectUnreadMessageCount: (userId: string) => [CHAT_KEY, "selectUnreadMessages", userId] as const
} as const;
