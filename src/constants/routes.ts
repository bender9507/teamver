export const routes = {
  home: "/",
  welcome: "/welcome",
  member: "/member",
  ownerChat: (roomId: number) => `/owner/chat/${roomId}`
} as const;
