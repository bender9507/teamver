export const routes = {
  home: "/",
  welcome: "/welcome",
  member: "/member",
  chat: "/chat",
  profile: (userId: string) => `/profile/${userId}`,
  profileEdit: (userId: string) => `/profile/${userId}/edit`,
  like: "/like",
  owner: "/owner",
  project: "/owner/project",
  create: "/project/create",
  chatRequest: "/owner/chat/request",
  ownerChat: (roomId: number) => `/owner/chat/${roomId}`
} as const;
