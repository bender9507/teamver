import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { PROJECT_DETAIL_MODAL, ProjectDetail, useDialog, useModal } from "~/components/Commons";
import { routes } from "~/constants/routes";
import type { ProjectDataRow } from "~/states/server/project";
import {
  projectsKey,
  useDeleteProjectMutate,
  useUpdateProjectStateMutate
} from "~/states/server/project";
import type { ProjectStatusUpdate } from ".";

export const useProjectStatusUpdate = ({ project }: ComponentProps<typeof ProjectStatusUpdate>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation("profile");

  const { confirm } = useDialog();
  const { mount, unmount } = useModal();

  const { mutate: updateProjectStateMutate } = useUpdateProjectStateMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects(project.ownerId));

      unmount("projectStateChangeModal");
    }
  });
  const { mutate: deleteProjectMutate } = useDeleteProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects(project.ownerId));

      unmount("projectStateChangeModal");
    }
  });

  const handleStateChange = async (state: ProjectDataRow["state"]) => {
    const confirmMessages = {
      DONE_RECRUIT: t("프로젝트 모집을 마감하시겠어요"),
      DONE_PROJECT: t("진행상태를 완료로 변경하시겠어요"),
      IN_RECRUIT: t("다시 프로젝트의 팀원 모집을 받으시겠어요")
    } as const;

    if (!(await confirm({ title: confirmMessages[state] }))) return;

    updateProjectStateMutate({ id: project.id, state });
  };

  const handleDeleteProject = async () => {
    if (
      !(await confirm({
        title: t("프로젝트를 정말 삭제하시겠어요")
      }))
    )
      return;

    deleteProjectMutate(project.id);
  };

  const handleEditProject = async () => {
    router.push({ pathname: routes.projectEdit, query: { projectId: project.id } });

    unmount("projectStateChangeModal");
  };

  const handleOpenProjectDetail = () => {
    mount(<ProjectDetail project={project} profile={project.ownerProfile} />, {
      id: PROJECT_DETAIL_MODAL,
      type: "bottom"
    });
  };

  const commonActions: Array<[string, () => void]> = [
    ["프로젝트 수정", handleEditProject],
    ["진행상태 완료로 변경", () => handleStateChange("DONE_PROJECT")],
    ["프로젝트 삭제", handleDeleteProject]
  ];

  const actionSets: Record<string, Array<[string, () => void]>> = {
    IN_RECRUIT: [["팀원 모집 마감", () => handleStateChange("DONE_RECRUIT")], ...commonActions],
    DONE_RECRUIT: [["팀원 모집 받기", () => handleStateChange("IN_RECRUIT")], ...commonActions],
    DONE_PROJECT: [["프로젝트 삭제", handleDeleteProject]]
  };

  return {
    mount,
    handleDeleteProject,
    handleStateChange,
    handleEditProject,
    handleOpenProjectDetail,
    actionSets
  };
};
