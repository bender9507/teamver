import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import {
  deleteChatMember,
  deleteChatRequestMember,
  deleteChatRequestOwner,
  insertChatMessage,
  insertChatRequestMember,
  insertChatRequestOwner,
  insertChatRoomWithMember,
  updateChatMemberState,
  updateChatRequestMemberState,
  updateChatRequestOwnerState,
  updateLastReadMessage,
  updateMessageReadState
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

export const useUpdateLastReadMessageMutate = (
  options?: PickMutationOptions<typeof updateLastReadMessage, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateLastReadMessage,
    ...options
  });
};

export const useUpdateMessageReadState = (
  options?: PickMutationOptions<typeof updateMessageReadState, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateMessageReadState,
    ...options
  });
};

export const useUpdateChatMemberStateMutate = (
  options?: PickMutationOptions<typeof updateChatMemberState, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateChatMemberState,
    ...options
  });
};
