import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import {
  deleteChatMember,
  insertChatMessage,
  insertChatRequest,
  insertChatRoomWithMember,
  updateChatRequestMemberState,
  updateChatRequestOwnerState
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

export const useUpdateChatRequestStateOwnerMutate = (
  options?: PickMutationOptions<typeof updateChatRequestOwnerState, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateChatRequestOwnerState,
    ...options
  });
};

export const useUpdateChatRequestStateMemberMutate = (
  options?: PickMutationOptions<typeof updateChatRequestMemberState, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateChatRequestMemberState,
    ...options
  });
};

export const useInsertChatRoomWithMemberMutate = (
  options?: PickMutationOptions<typeof insertChatRoomWithMember, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertChatRoomWithMember,
    ...options
  });
};
