import { useRouter } from "next/router";
import { useSelectFollowProjectsQuery } from "~/states/server/project";

export const useMember = (userId: string) => {
  const { data: followProjects } = useSelectFollowProjectsQuery(userId);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return { followProjects, handleBack };
};
