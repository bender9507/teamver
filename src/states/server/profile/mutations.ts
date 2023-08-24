import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { insertProfile } from "./apis";

export const useInsertProfileMutate = (
  options?: PickMutationOptions<typeof insertProfile, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertProfile,
    ...options
  });
};
