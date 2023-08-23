import { useQuery } from "@tanstack/react-query"
import { getProjectMembers, getProjects } from "./apis"
import { projectsKey } from "./keys"

export const useGetProjectQuery = (userId: string) => {
  return useQuery({
    queryKey: projectsKey.getProjectsById(userId),
    queryFn: () => getProjects(userId),
    initialData: []
  })
}

export const useGetProjectMembersQuery = (projectId: string) => {
  return useQuery({
    queryKey: projectsKey.getProjectMembersById(projectId),
    queryFn: () => getProjectMembers(projectId),
    initialData: []
  })
}

