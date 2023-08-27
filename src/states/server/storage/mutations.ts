import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { uploadProfileImages, uploadProjectImages } from "./apis";

export const useUploadProfileImageMutate = (
  options?: PickMutationOptions<
    typeof uploadProfileImages,
    "onSuccess" | "onError",
    { publicUrl: string }
  >
) => {
  return useMutation({
    mutationFn: uploadProfileImages,
    ...options
  });
};

export const useUploadProjectImageMutate = (
  options?: PickMutationOptions<
    typeof uploadProjectImages,
    "onSuccess" | "onError",
    { publicUrl: string }
  >
) => {
  return useMutation({
    mutationFn: uploadProjectImages,
    ...options
  });
};
