import type { selectRecommendedProjects } from ".";

const PROJECT_KEY = "PROJECTS";

export const projectsKey = {
  selectProject: (projectId: string) => [PROJECT_KEY, "selectProject", projectId] as const,
  selectOwnerProjects: (myId?: string) => [PROJECT_KEY, "selectOwnerProjects", myId] as const,
  selectMemberProjects: (myId?: string) => [PROJECT_KEY, "selectMemberProjects", myId] as const,
  selectFollowProjects: (myId?: string) => [PROJECT_KEY, "selectFollowProjects", myId] as const,
  selectRecommendedProjects: (filter: Parameters<typeof selectRecommendedProjects>[0]) =>
    [
      PROJECT_KEY,
      "selectRecommendedProjects",
      filter.seedValue,
      filter.projectType,
      ...filter.areas
    ] as const
} as const;
