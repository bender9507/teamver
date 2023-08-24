import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { insertFollow, insertProfile, updateProfile } from "./apis";

export const useInsertProfileMutate = (
  options?: PickMutationOptions<typeof insertProfile, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertProfile,
    ...options
  });
};

export const useUpdateProfileMutate = (
  options?: PickMutationOptions<typeof updateProfile, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateProfile,
    ...options
  });
};

export const useInsertFollowMutate = (
  options?: PickMutationOptions<typeof insertFollow, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertFollow,
    ...options
  });
};
