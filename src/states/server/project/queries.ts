import { useQuery } from "@tanstack/react-query"
import { getProjects } from "./apis"

export const useGetProjectQuery = (userId: string) => {
  return useQuery({
    queryKey: ['projects', userId],
    queryFn: () => getProjects(userId),
    initialData: []
  })
}