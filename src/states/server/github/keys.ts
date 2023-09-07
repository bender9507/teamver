const GITHUB_KEY = "GITHUB_KEY";

export const githubKeys = {
  getRepos: (username: string) => [GITHUB_KEY, "getRepos", username] as const
} as const;
