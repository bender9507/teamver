import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useDialog, useModal } from "~/components/Commons";
import { routes } from "~/constants/routes";
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
      DONE_RECRUIT: "프로젝트 모집을 마감하시겠어요",
      DONE_PROJECT: "진행상태를 완료로 변경하시겠어요",
      IN_RECRUIT: "다시 프로젝트의 팀원 모집을 받으시겠어요"
    } as const;

    if (!(await confirm({ title: confirmMessages[state] }))) return;

    updateProjectStateMutate({ id: project.id, state });
  };

  const handleDeleteProject = async () => {
    if (
      !(await confirm({
        title: "프로젝트를 정말 삭제하시겠어요",
        message: "한번 삭제된 프로젝트는 복구되지 않아요"
      }))
    )
      return;

    deleteProjectMutate(project.id);
  };

  const handleEditProject = async () => {
    router.push(routes.projectEdit(project.id));

    unmount("projectStateChangeModal");
  };

  return {
    mount,
    handleDeleteProject,
    handleStateChange,
    handleEditProject
  };
};
