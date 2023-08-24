import { useQuery } from "@tanstack/react-query";
import { useSuspendedQuery } from "~/hooks";
import { selectMemberProjects, selectOwnerProjects, selectProject } from "./apis";
import { projectsKey } from "./keys";

export const useSelectProjectQuery = (projectId: string) => {
  return useSuspendedQuery({
    queryKey: projectsKey.selectProject(projectId),
    queryFn: () => selectProject(projectId)
  });
};

export const useSelectOwnerProjectsQuery = (myId?: string) => {
  return useQuery({
    queryKey: projectsKey.selectOwnerProjects(myId),
    queryFn: () => selectOwnerProjects(myId),
    initialData: [],
    enabled: !!myId
  });
};

export const useSelectMemberProjectsQuery = (myId?: string) => {
  return useQuery({
    queryKey: projectsKey.selectMemberProjects(myId),
    queryFn: () => selectMemberProjects(myId),
    initialData: [],
    enabled: !!myId
  });
};
