import { useSuspendedQuery } from "~/hooks";
import { getConstants } from "./apis";
import { constantKeys } from "./keys";
import type { ConstantMapKey } from "./types";

export const useGetConstantQuery = <T extends ConstantMapKey[]>(tables: T) => {
  return useSuspendedQuery({
    queryKey: constantKeys.getConstants(tables),
    queryFn: () => getConstants(tables)
  });
};
