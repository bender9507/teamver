import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDialog, useModal } from "~/components/Commons";
import { useSelectProfileQuery } from "~/states/server/profile";
import type { ProjectMembersUpdate } from "~/states/server/project";
import {
  projectsKey,
  useDeleteMemberInProjectMutate,
  useSelectProjectQuery
} from "~/states/server/project";

export const useProjectMemberList = () => {
  const { t } = useTranslation("project");

  const router = useRouter();
  const user = useUser() as User;
  const queryClient = useQueryClient();

  const { mount } = useModal();
  const { confirm, toast } = useDialog();

  const projectId = Number(router.query.projectId);

  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: projectData } = useSelectProjectQuery(projectId);

  const projectMembersData = projectData.members;

  const { mutate: deleteMemberInProjectMutate } = useDeleteMemberInProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectProject(projectId));
    },
    onError: () => toast({ type: "error", message: t("팀원 삭제에 실패했습니다") })
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

  return {
    user,
    profile,
    projectId,
    projectMembersData,
    filteredData,
    mount,
    handleDeleteMember
  };
};
