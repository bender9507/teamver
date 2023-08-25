import { useMutation } from "@tanstack/react-query";
import { insertProject, insertProjectInvite, updateProject, updateProjectInviteState } from ".";
import type { PickMutationOptions } from "../server.types";

export const useInsertProjectMutate = (
  options?: PickMutationOptions<typeof insertProject, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertProject,
    ...options
  });
};

export const useUpdateProjectMutate = (
  options?: PickMutationOptions<typeof updateProject, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateProject,
    ...options
  });
};

export const useInsertProjectInviteMutate = (
  options?: PickMutationOptions<typeof insertProjectInvite, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertProjectInvite,
    ...options
  });
};

export const useUpdateProjectInviteStateMutate = (
  options?: PickMutationOptions<typeof updateProjectInviteState, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateProjectInviteState,
    ...options
  });
};
