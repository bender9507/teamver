const PROJECT_KEY = "PROJECT";

export const projectKeys = {
  //   selectProfile: (userId: string) => [PROJECT_KEY, "selectProfile", userId] as const,
  //   selectFollows: (myId: string) => [PROJECT_KEY, "selectFollows", myId] as const,
  selectProjects: (myId: string) => [PROJECT_KEY, "selectProjects", myId] as const
} as const;
