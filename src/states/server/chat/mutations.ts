import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import {
  deleteChatMember,
  deleteChatRequestMember,
  deleteChatRequestOwner,
  insertChatMessage,
  insertChatRequestMember,
  insertChatRequestOwner,
  updateChatRequestState
} from "./apis";

export const useInsertChatRequestsOwnerMutate = (
  options?: PickMutationOptions<typeof insertChatRequestOwner, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertChatRequestOwner,
    ...options
  });
};

export const useInsertChatRequestsMemberMutate = (
  options?: PickMutationOptions<typeof insertChatRequestMember, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertChatRequestMember,
    ...options
  });
};

export const useDeleteChatRequestsMemberMutate = (
  options?: PickMutationOptions<typeof deleteChatRequestMember, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteChatRequestMember,
    ...options
  });
};

export const useDeleteChatRequestsOwnerMutate = (
  options?: PickMutationOptions<typeof deleteChatRequestOwner, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteChatRequestOwner,
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
