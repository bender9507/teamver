const PROFILE_KEY = "PROFILE";

export const profileKeys = {
  selectProfile: (userId: string) => [PROFILE_KEY, "selectProfile", userId] as const,
  selectFollows: (myId: string) => [PROFILE_KEY, "selectFollows", myId] as const,
  selectFollowers: (myId: string) => [PROFILE_KEY, "selectFollowers", myId] as const
} as const;
