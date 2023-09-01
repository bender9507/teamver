import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import {
  checkNameValidation,
  deleteFollow,
  insertFollow,
  insertProfile,
  updateProfile,
  updateRole
} from "./apis";

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

export const useDeleteFollowMutate = (
  options?: PickMutationOptions<typeof deleteFollow, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteFollow,
    ...options
  });
};

export const useCheckValidationMutate = (
  options?: PickMutationOptions<typeof checkNameValidation, "onSuccess" | "onError", boolean>
) => {
  return useMutation({
    mutationFn: checkNameValidation,
    ...options
  });
};

export const useUpdateRoleMutate = (
  options?: PickMutationOptions<typeof updateRole, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateRole,
    ...options
  });
};
