import type { ProjectAllDataRow } from "~/states/server/project";
import { isEmpty } from "~/utils";

export const useProjectList = (
  selectedTab: string,
  inProjects: ProjectAllDataRow[],
  doneProjects: ProjectAllDataRow[]
) => {
  const filteredProjects = selectedTab === "DONE_PROJECT" ? doneProjects : inProjects;

  const isEmptyProjects = isEmpty(filteredProjects);

  return { filteredProjects, isEmptyProjects };
};
