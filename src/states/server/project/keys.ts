const PROJECT_KEY = "PROJECTS";

export const projectsKey = {
  selectProject: (projectId: string) => [PROJECT_KEY, "selectProject", projectId] as const,
  selectOwnerProjects: (myId?: string) => [PROJECT_KEY, "selectOwnerProjects", myId] as const
} as const;
