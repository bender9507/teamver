const GITHUB_KEY = "GITHUB_KEY";

export const githubKeys = {
  getRepos: (username: string) => [GITHUB_KEY, "getRepos", username] as const,
  getRepo: (repoUrl: string) => [GITHUB_KEY, "getRepo", repoUrl] as const
} as const;
