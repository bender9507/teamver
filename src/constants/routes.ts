export const routes = {
  home: "/",
  welcome: "/welcome",
  member: "/member",
  chatRequest: "/owner/chat/request",
  ownerChat: (roomId: number) => `/owner/chat/${roomId}`
} as const;
