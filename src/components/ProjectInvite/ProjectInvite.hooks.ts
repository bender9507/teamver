import { useSelectOwnerProjectsQuery } from "~/states/server/project";

export const useProjectInvite = (ownerId: string) => {
  const { data: projects } = useSelectOwnerProjectsQuery(ownerId);
  console.log("프로젝트 데이터", projects);

  return {
    projects
  };
};
