import type { selectChatRequests } from "./apis";

const CHAT_KEY = "CHAT";

export const chatKeys = {
  selectChatRequests: (requests: Parameters<typeof selectChatRequests>[0]) => [
    CHAT_KEY,
    "selectChatRequests",
    requests.requesterId,
    requests.state
  ]
} as const;
