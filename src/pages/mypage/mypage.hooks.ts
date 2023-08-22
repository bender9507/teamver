import { useGetProjectQuery } from "~/states/server/project/queries";

export const useMyPage = (userId: string) => {
  const {data} = useGetProjectQuery(userId)

  const DoneProjectList = data.filter((element) => element.projects?.state === 'DONE_PROJECT')
  const ProceedProjectList = data.filter((element) => element.projects?.state !== 'DONE_PROJECT')

  return { DoneProjectList, ProceedProjectList }
}