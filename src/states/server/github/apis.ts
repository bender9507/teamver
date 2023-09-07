import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN
});

export const getRepos = async (username: string) => {
  const repos = await octokit.request("GET /users/{username}/repos", {
    username
  });

  return repos.data;
};
