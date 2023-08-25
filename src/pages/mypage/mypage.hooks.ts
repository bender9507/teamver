import { useSelectProfileQuery } from "~/states/server/profile";
import { useSelectMemberProjectsQuery } from "~/states/server/project";

export const useMyPage = (userId: string) => {
  const { data: projects } = useSelectMemberProjectsQuery(userId);
  const { data: user } = useSelectProfileQuery(userId);

  const proceedProjects = projects.filter((project) => project.state !== "DONE_PROJECT");
  const doneProjects = projects.filter((project) => project.state === "DONE_PROJECT");

  return { proceedProjects, doneProjects, user };
};
