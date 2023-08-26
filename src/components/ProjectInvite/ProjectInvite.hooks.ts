import { useState } from "react";
import { useSelectOwnerProjectsQuery } from "~/states/server/project";

export const useProjectInvite = (ownerId: string) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { data: projects } = useSelectOwnerProjectsQuery(ownerId);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const selectProject = (projectId: number) => {
    setSelectedProject(projectId);
    toggle();
  };

  return {
    isOpen,
    toggle,
    selectedProject,
    selectProject,
    projects
  };
};
