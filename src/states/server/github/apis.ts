import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN
});

export const getRepos = async (username: string) => {
  const { data: repos } = await octokit.request("GET /users/{username}/repos", {
    username
  });

  return repos;
};

export const getRepo = async (repoUrl: string) => {
  const split = repoUrl.split("/");

  const { data: repo } = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: split[4],
    repo: split[5]
  });

  return repo;
};
