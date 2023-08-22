import { useQuery } from "@tanstack/react-query"
import { getProjects, getReviews } from "./apis"

export const useGetProjectQuery = (userId: string) => {
  return useQuery({
    queryKey: ['projects', userId],
    queryFn: () => getProjects(userId),
    initialData: []
  })
}

export const useGetReviewQuery = (userId: string) => {
  return useQuery({
    queryKey: ['reviews', userId],
    queryFn: () => getReviews(userId),
    initialData: []
  })
}