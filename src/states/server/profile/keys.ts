const PROFILE_KEY = "PROFILE";

export const profileKeys = {
  selectProfile: (userId: string) => [PROFILE_KEY, "selectProfile", userId] as const
} as const;
