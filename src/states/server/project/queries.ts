import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSuspendedQuery } from "~/hooks";
import {
  selectFollowProjects,
  selectMemberProjects,
  selectOwnerProjects,
  selectProject,
  selectRecommendedProjects
} from "./apis";
import { projectsKey } from "./keys";

export const useSelectProjectQuery = (projectId: string) => {
  return useSuspendedQuery({
    queryKey: projectsKey.selectProject(projectId),
    queryFn: () => selectProject(projectId)
  });
};

export const useSelectOwnerProjectsQuery = (myId: string) => {
  return useQuery({
    queryKey: projectsKey.selectOwnerProjects(myId),
    queryFn: () => selectOwnerProjects(myId),
    initialData: []
  });
};

export const useSelectMemberProjectsQuery = (myId: string) => {
  return useQuery({
    queryKey: projectsKey.selectMemberProjects(myId),
    queryFn: () => selectMemberProjects(myId),
    initialData: []
  });
};

export const useSelectFollowProjectsQuery = (myId: string) => {
  return useQuery({
    queryKey: projectsKey.selectFollowProjects(myId),
    queryFn: () => selectFollowProjects(myId),
    initialData: [],
    enabled: !!myId
  });
};

export const useSelectRecommendedProjectsQuery = (
  filter: Parameters<typeof selectRecommendedProjects>[0]
) => {
  return useInfiniteQuery({
    queryKey: projectsKey.selectRecommendedProjects(filter),
    queryFn: ({ pageParam }) => selectRecommendedProjects({ pageParam, limit: 10, ...filter }),
    getNextPageParam: (page) => page.nextPage
  });
};
// export const useSelectRecommendedProjectsQuery = (
//   filter: Parameters<typeof selectRecommendedProjects>[0]
// ) => {
//   return useQuery({
//     queryKey: projectsKey.selectRecommendedProjects(filter),
//     queryFn: () => selectRecommendedProjects(filter),
//     initialData: []
//   });
// };
