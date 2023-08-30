import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import { useSelectProfileQuery } from "~/states/server/profile";
import { useSelectFollowProjectsQuery } from "~/states/server/project";

export const useMember = (userId: string) => {
  const { data: followProjects } = useSelectFollowProjectsQuery(userId);
  const { data: profile } = useSelectProfileQuery(userId);
  const { mount } = useModal();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return { followProjects, profile, mount, handleBack };
};
