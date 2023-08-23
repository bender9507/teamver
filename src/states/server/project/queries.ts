import { useQuery } from "@tanstack/react-query"
import { getProjects } from "./apis"
import { projectsKey } from "./keys"

export const useGetProjectQuery = (userId: string) => {
  return useQuery({
    queryKey: projectsKey.getProjectsById(userId),
    queryFn: () => getProjects(userId),
    initialData: []
  })
}

