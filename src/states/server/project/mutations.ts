import { useMutation } from "@tanstack/react-query";
import { insertProject, updateProject } from ".";
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
