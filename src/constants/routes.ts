export const routes = {
  home: "/",
  main: "/home",
  welcome: "/welcome",
  member: "/member",
  chat: "/chat",
  profile: (userId: string) => `/profile/${userId}`,
  profileEdit: (userId: string) => `/profile/${userId}/edit`,
  like: "/like",
  owner: "/owner",
  project: "/project",
  projectCreate: `/project/create`,
  projectEdit: (projectId: number) => `/project/${projectId}/edit`,
  create: "/project/create",
  chatRequest: "/owner/chat/request",
  ownerChat: (roomId: number) => `/owner/chat/${roomId}`
} as const;
