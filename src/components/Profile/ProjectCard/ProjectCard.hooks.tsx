import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { PROJECT_DETAIL_MODAL, ProjectDetail, useDialog, useModal } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { useSelectProfileQuery } from "~/states/server/profile";
import type { ProjectDataRow } from "~/states/server/project";
import {
  projectsKey,
  useDeleteProjectMutate,
  useUpdateProjectStateMutate
} from "~/states/server/project";
import type { ProjectCard } from "./ProjectCard";

export const useProjectCard = ({ project }: ComponentProps<typeof ProjectCard>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation("profile");

  const { confirm } = useDialog();
  const { mount, unmount } = useModal();

  const { data: profile } = useSelectProfileQuery(project.ownerId);

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
    mount(<ProjectDetail project={project} profile={profile} />, {
      id: PROJECT_DETAIL_MODAL,
      type: "bottom"
    });
  };

  return {
    mount,
    handleDeleteProject,
    handleStateChange,
    handleEditProject,
    handleOpenProjectDetail
  };
};
