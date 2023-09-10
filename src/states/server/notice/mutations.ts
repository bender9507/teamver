import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import {
  deleteNoticeMember,
  deleteNoticeOwner,
  insertNoticeMember,
  insertNoticeOwner,
  updateNoticeMember,
  updateNoticeOwner
} from "./apis";

export const useInsertNoticeMember = (
  options?: PickMutationOptions<typeof insertNoticeMember, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertNoticeMember,
    ...options
  });
};

export const useInsertNoticeOwner = (
  options?: PickMutationOptions<typeof insertNoticeOwner, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: insertNoticeOwner,
    ...options
  });
};

export const useUpdateNoticeMember = (
  options?: PickMutationOptions<typeof updateNoticeMember, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateNoticeMember,
    ...options
  });
};

export const useUpdateNoticeOwner = (
  options?: PickMutationOptions<typeof updateNoticeOwner, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: updateNoticeOwner,
    ...options
  });
};

export const useDeleteNoticeMember = (
  options?: PickMutationOptions<typeof deleteNoticeMember, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteNoticeMember,
    ...options
  });
};

export const useDeleteNoticeOwner = (
  options?: PickMutationOptions<typeof deleteNoticeOwner, "onSuccess" | "onError">
) => {
  return useMutation({
    mutationFn: deleteNoticeOwner,
    ...options
  });
};
