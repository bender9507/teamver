import { useMutation } from "@tanstack/react-query";
import type { PickMutationOptions } from "../server.types";
import { uploadProfileImages } from "./apis";

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
