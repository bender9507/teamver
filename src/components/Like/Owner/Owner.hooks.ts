import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import { useSelectFollows } from "~/states/server/profile";

export const useOwner = (userId: string) => {
  const { data: follows } = useSelectFollows(userId);
  const { mount } = useModal();
  const router = useRouter();

  const filteredData = {
    positions: [],
    languages: [],
    skills: [],
    areas: []
  };

  const handleBack = () => {
    router.back();
  };

  return { follows, filteredData, mount, handleBack };
};
