import { useGetProjectQuery, } from "~/states/server/project/queries";
import { useGetReviewQuery } from "~/states/server/review/queries";

export const useMyPage = (userId: string) => {
  const { data: projects } = useGetProjectQuery(userId)
  const { data: reviews } = useGetReviewQuery(userId)
  const reviewCount = reviews.length

  const doneProjectList = projects.filter((element) => element.projects?.state === 'DONE_PROJECT')
  const proceedProjectList = projects.filter((element) => element.projects?.state !== 'DONE_PROJECT')

  return { doneProjectList, proceedProjectList, reviews, reviewCount }
}