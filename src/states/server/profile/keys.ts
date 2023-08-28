import type { selectRecommendedProfiles } from ".";

const PROFILE_KEY = "PROFILE";

export const profileKeys = {
  selectProfile: (userId: string) => [PROFILE_KEY, "selectProfile", userId] as const,
  selectFollows: (myId: string) => [PROFILE_KEY, "selectFollows", myId] as const,
  selectFollowers: (myId: string) => [PROFILE_KEY, "selectFollowers", myId] as const,
  selectRecommendedProfiles: (filter: Parameters<typeof selectRecommendedProfiles>[0]) =>
    [
      PROFILE_KEY,
      "selectRecommendedProfiles",
      filter.seedValue,
      filter.userId,
      ...filter.languages,
      ...filter.skills,
      ...filter.positions,
      ...filter.areas
    ] as const
} as const;
