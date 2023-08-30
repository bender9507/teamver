import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import type { ProjectMembersUpdate } from "~/states/server/project";
import {
  projectsKey,
  useDeleteMemberInProjectMutate,
  useSelectProjectQuery
} from "~/states/server/project";

export const useProjectMembers = (projectId: number) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { mount } = useModal();

  const { data: projectData } = useSelectProjectQuery(projectId);

  const projectMembersData = projectData.members;

  const { mutate: deleteMemberInProjectMutate } = useDeleteMemberInProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectProject(projectId));
    }
  });

  const filteredData = {
    positions: [],
    languages: [],
    skills: [],
    areas: []
  };

  const handleDeleteMember = ({ memberId, projectId }: ProjectMembersUpdate) => {
    deleteMemberInProjectMutate({ memberId, projectId });
  };

  const handleBack = () => {
    router.back();
  };

  return { projectMembersData, filteredData, mount, handleBack, handleDeleteMember };
};
