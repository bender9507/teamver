import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { signInWithOAuth, signInWithPassword } from "./apis";

export const useSignInWithOAuthMutate = (
  options?: PickMutationOptions<typeof signInWithOAuth, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: signInWithOAuth,
    ...options
  });
};

export const useSignInWithPasswordMutate = (
  options?: PickMutationOptions<typeof signInWithPassword, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: signInWithPassword,
    ...options
  });
};
