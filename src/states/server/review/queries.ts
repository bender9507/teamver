import { useQuery } from "@tanstack/react-query"
import { getReviews } from "./apis"
import { reviewsKey } from "./keys"

export const useGetReviewQuery = (userId: string) => {
  return useQuery({
    queryKey: reviewsKey.getReviewsById(userId),
    queryFn: () => getReviews(userId),
    initialData: []
  })
}