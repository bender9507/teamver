import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { createProfile } from "./apis";

export const useCreateProfileMutate = (
  options?: PickMutationOptions<typeof createProfile, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: createProfile,
    ...options
  });
};
