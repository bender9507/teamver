import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import {
  deleteChatMember,
  insertChatMessage,
  insertChatRequest,
  updateChatRequestState
} from "./apis";

export const useInsertChatRequestMutate = (
  options?: PickMutationOptions<typeof insertChatRequest, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertChatRequest,
    ...options
  });
};

export const useInsertChatMessageMutate = (
  options?: PickMutationOptions<typeof insertChatMessage, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertChatMessage,
    ...options
  });
};

export const useDeleteChatMemberMutate = (
  options?: PickMutationOptions<typeof deleteChatMember, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteChatMember,
    ...options
  });
};

export const useUpdateChatRequestStateMutate = (
  options?: PickMutationOptions<typeof updateChatRequestState, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateChatRequestState,
    ...options
  });
};
