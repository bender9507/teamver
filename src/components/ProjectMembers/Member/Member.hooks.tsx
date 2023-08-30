import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import { useSelectProjectQuery } from "~/states/server/project";

export const useProjectMembers = (projectId: string) => {
  const router = useRouter();
  const { mount } = useModal();

  const { data: projectData } = useSelectProjectQuery(projectId);

  const projectMembersData = projectData.members;

  const filteredData = {
    positions: [],
    languages: [],
    skills: [],
    areas: []
  };

  const handleBack = () => {
    router.back();
  };

  return { projectMembersData, filteredData, mount, handleBack };
};
