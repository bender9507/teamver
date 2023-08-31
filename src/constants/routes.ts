export const routes = {
  home: "/",
  main: "/home",
  welcome: "/welcome",
  member: "/member",
  chat: "/chat",
  profile: (userId: string) => `/profile/${userId}`,
  profileEdit: (userId: string) => `/profile/${userId}/edit`,
  setting: "/setting",
  like: "/like",
  owner: "/owner",
  project: "/project",
  projectCreate: `/project/create`,
  projectEdit: (projectId: number) => `/project/${projectId}/edit`,
  create: "/project/create",
  chatRequest: "/chat/request",
  chatRoom: (roomId: number) => `/chat/${roomId}`
} as const;
