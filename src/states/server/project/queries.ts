import { useSuspendedQuery } from "~/hooks";
import { selectProject } from "./apis";
import { projectsKey } from "./keys";

export const useSelectProjectQuery = (projectId: string) => {
  return useSuspendedQuery({
    queryKey: projectsKey.selectProject(projectId),
    queryFn: () => selectProject(projectId)
  });
};
