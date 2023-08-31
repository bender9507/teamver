import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
  return useQuery({
    queryKey: profileKeys.selectFollows(myId),
    queryFn: () => selectFollows(myId),
    initialData: []
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
