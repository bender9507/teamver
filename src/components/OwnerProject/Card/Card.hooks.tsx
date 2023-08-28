import { useQueryClient } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { useModal } from "~/components/Commons";
import {
  projectsKey,
  useDeleteProjectMutate,
  useUpdateProjectMutate
} from "~/states/server/project";
import type { Card } from ".";
import { CARD_MODAL } from "./Card.constants";

export const useCard = (project: ComponentProps<typeof Card>) => {
  const queryClient = useQueryClient();

  const { unmount } = useModal();

  const { mutate: updateProjectMutate } = useUpdateProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects(project.ownerId));

      unmount(CARD_MODAL);
    }
  });

  const { mutate: deleteProjectMutate } = useDeleteProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects(project.ownerId));

      unmount(CARD_MODAL);
    }
  });

  const handleUpdateProject = (newState: "IN_RECRUIT" | "DONE_RECRUIT" | "DONE_PROJECT") => {
    const skills = project.skills.map((skill) => skill.id);
    const languages = project.languages.map((language) => language.id);
    const positions = project.positions.map((position) => position.id);

    updateProjectMutate({
      id: project.id,
      state: newState,
      skills,
      languages,
      positions
    });
  };

  const handleDeleteProject = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();

    deleteProjectMutate(project.id);
  };

  return { project, handleUpdateProject, handleDeleteProject };
};
