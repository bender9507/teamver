export const routes = {
  home: "/",
  welcome: "/welcome",
  member: "/member",
  project: "/owner/project",
  create: "/project/create",
  chatRequest: "/owner/chat/request",
  ownerChat: (roomId: number) => `/owner/chat/${roomId}`
} as const;
