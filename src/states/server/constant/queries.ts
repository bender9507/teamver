import { useSuspendedQuery } from "~/hooks";
import { selectConstants } from "./apis";
import { constantKeys } from "./keys";

export const useSelectConstantsQuery = () => {
  return useSuspendedQuery({
    queryKey: constantKeys.selectConstants(),
    queryFn: selectConstants
  });
};
