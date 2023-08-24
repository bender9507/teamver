const PROJECT_KEY = "PROJECTS";

export const projectsKey = {
  selectProject: (projectId: string) => [PROJECT_KEY, "selectProject", projectId] as const
} as const;
