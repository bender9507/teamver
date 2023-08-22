import { useGetProjectQuery, useGetReviewQuery } from "~/states/server/project/queries";

export const useMyPage = (userId: string) => {
  const { data: projects } = useGetProjectQuery(userId)
  const { data: reviews } = useGetReviewQuery(userId)

  const DoneProjectList = projects.filter((element) => element.projects?.state === 'DONE_PROJECT')
  const ProceedProjectList = projects.filter((element) => element.projects?.state !== 'DONE_PROJECT')

  return { DoneProjectList, ProceedProjectList, reviews }
}