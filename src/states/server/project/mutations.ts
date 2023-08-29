import { useMutation } from "@tanstack/react-query";
import {
  deleteProject,
  insertFollowProject,
  insertProject,
  insertProjectInvite,
  updateProject,
  updateProjectInviteState,
  updateProjectState
} from ".";
import type { PickMutationOptions } from "../server.types";

export const useInsertProjectMutate = (
  options?: PickMutationOptions<typeof insertProject, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertProject,
    ...options
  });
};

export const useDeleteProjectMutate = (
  options?: PickMutationOptions<typeof deleteProject, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteProject,
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

export const useInsertFollowProjectMutate = (
  options?: PickMutationOptions<typeof insertFollowProject, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertFollowProject,
    ...options
  });
};

export const useUpdateProjectStateMutate = (
  options?: PickMutationOptions<typeof updateProjectState, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateProjectState,
    ...options
  });
};
