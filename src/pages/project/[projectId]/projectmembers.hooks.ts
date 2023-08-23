import { useRouter } from "next/router";
import { useGetProjectMembersQuery } from "~/states/server";

export const useProjectMembers = () => {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const { data: projectMembers } = useGetProjectMembersQuery(projectId);

  return { projectMembers };
};
