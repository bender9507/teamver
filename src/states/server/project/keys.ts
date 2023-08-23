const PROJECT_KEY = "PROJECTS";

export const projectsKey = {
  getProjectsById: (userId: string) => [PROJECT_KEY, 'getProjectsById', userId] as const,
  getProjectMembersById: (projectId: string) => [PROJECT_KEY, 'getProjectMembersById', projectId] as const,
  getProjects: () => [PROJECT_KEY, 'getProjects'] as const
} as const