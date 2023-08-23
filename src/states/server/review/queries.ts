import { useQuery } from "@tanstack/react-query"
import { getReviews } from "./apis"

export const useGetReviewQuery = (userId: string) => {
  return useQuery({
    queryKey: ['reviews', userId],
    queryFn: () => getReviews(userId),
    initialData: []
  })
}