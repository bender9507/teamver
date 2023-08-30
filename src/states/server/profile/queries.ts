import { useInfiniteQuery } from "@tanstack/react-query";
import { useSuspendedQuery } from "~/hooks";
import { selectFollows, selectProfile, selectRecommendedProfiles } from "./apis";
import { profileKeys } from "./keys";

export const useSelectProfileQuery = (userId: string) => {
  return useSuspendedQuery({
    queryKey: profileKeys.selectProfile(userId),
    queryFn: () => selectProfile(userId)
  });
};

export const useSelectFollows = (myId: string) => {
  return useSuspendedQuery({
    queryKey: profileKeys.selectFollows(myId),
    queryFn: () => selectFollows(myId)
  });
};

export const useSelectRecommendedProfilesQuery = (
  filter: Parameters<typeof selectRecommendedProfiles>[0]
) => {
  return useInfiniteQuery({
    queryKey: profileKeys.selectRecommendedProfiles(filter),
    queryFn: ({ pageParam }) => selectRecommendedProfiles({ pageParam, limit: 10, ...filter }),
    getNextPageParam: (page) => page.nextPage
  });
};
