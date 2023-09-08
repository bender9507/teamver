import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { insertNoticeMember, insertNoticeOwner } from "./apis";

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
