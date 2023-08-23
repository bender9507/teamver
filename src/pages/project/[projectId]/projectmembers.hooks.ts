import { useRouter } from "next/router"

export const useProjectMembers = () => {
  const router = useRouter()

  const {projectId} = router.query as {projectId: string}

  
}