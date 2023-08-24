import { useMutation } from "@tanstack/react-query";
import { insertProject } from ".";
import type { PickMutationOptions } from "../server.types";

export const useInsertProjectMutate = (
  options?: PickMutationOptions<typeof insertProject, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertProject,
    ...options
  });
};
