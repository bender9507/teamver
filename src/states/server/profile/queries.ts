import { useSuspendedQuery } from "~/hooks";
import { profileKeys, selectProfile } from ".";

export const useSelectProfileQuery = (userId: string) => {
  return useSuspendedQuery({
    queryKey: profileKeys.selectProfile(userId),
    queryFn: () => selectProfile(userId)
  });
};
