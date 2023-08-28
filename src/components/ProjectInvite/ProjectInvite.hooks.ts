import { useSelectOwnerProjectsQuery } from "~/states/server/project";

export const useProjectInvite = (ownerId: string) => {
  const { data: projects } = useSelectOwnerProjectsQuery(ownerId);

  const recruitingProjects = projects?.filter((project) => project.state === "IN_RECRUIT");

  return {
    projects: recruitingProjects
  };
};
