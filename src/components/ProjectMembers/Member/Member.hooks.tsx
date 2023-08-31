import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useModal } from "~/components/Commons";
import { useSelectProjectQuery } from "~/states/server/project";
import type { Member } from ".";

export const useProjectMembers = ({ projectId }: ComponentProps<typeof Member>) => {
  const router = useRouter();
  const { mount } = useModal();

  const { data: projectData } = useSelectProjectQuery(Number(projectId));

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
