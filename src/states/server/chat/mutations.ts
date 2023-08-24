import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { insertChatRequest } from "./apis";

export const useInsertChatRequestMutate = (
  options?: PickMutationOptions<typeof insertChatRequest, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertChatRequest,
    ...options
  });
};
