import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";

import { useSelectFollows } from "~/states/server/profile";

export const useOwner = (userId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: follows } = useSelectFollows(userId);

  const { mount } = useModal();

  const handleBack = () => {
    router.back();
  };

  return { follows, mount, handleBack };
};
