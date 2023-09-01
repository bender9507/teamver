import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useDialog, useModal } from "~/components/Commons";
import type { ProjectMembersUpdate } from "~/states/server/project";
import {
  projectsKey,
  useDeleteMemberInProjectMutate,
  useSelectProjectQuery
} from "~/states/server/project";
import type { Owner } from ".";

export const useProjectMembers = ({ projectId }: ComponentProps<typeof Owner>) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation("projectMembers");

  const router = useRouter();
  const { mount } = useModal();
  const { confirm } = useDialog();

  const { data: projectData } = useSelectProjectQuery(Number(projectId));

  const projectMembersData = projectData.members;

  const { mutate: deleteMemberInProjectMutate } = useDeleteMemberInProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectProject(Number(projectId)));
    }
  });

  const filteredData = {
    positions: [],
    languages: [],
    skills: [],
    areas: []
  };

  const handleDeleteMember = async ({ memberId, projectId }: ProjectMembersUpdate) => {
    const confirmed = await confirm({
      title: t("팀원을 정말 삭제하시겠어요")
    });

    if (confirmed) {
      deleteMemberInProjectMutate({ memberId, projectId });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return { projectMembersData, filteredData, mount, handleBack, handleDeleteMember };
};
