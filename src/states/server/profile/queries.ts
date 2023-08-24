import { useSuspendedQuery } from "~/hooks";
import { selectFollowers, selectFollows, selectProfile } from "./apis";
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

export const useSelectFollowers = (myId: string) => {
  return useSuspendedQuery({
    queryKey: profileKeys.selectFollowers(myId),
    queryFn: () => selectFollowers(myId)
  });
};
