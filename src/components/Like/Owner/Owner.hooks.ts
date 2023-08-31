import { useRouter } from "next/router";
import { useSelectFollows } from "~/states/server/profile";

export const useOwner = (userId: string) => {
  const { data: follows } = useSelectFollows(userId);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return { follows, handleBack };
};
