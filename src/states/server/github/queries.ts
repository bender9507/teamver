import { useQuery } from "@tanstack/react-query";
import { getRepo, getRepos } from "./apis";
import { githubKeys } from "./keys";

export const useGetReposQuery = (username: string) => {
  return useQuery({
    queryKey: githubKeys.getRepos(username),
    queryFn: () => getRepos(username),
    initialData: []
  });
};

export const useGetRepoQuery = (repoUrl: string, enabled: boolean) => {
  return useQuery({
    queryKey: githubKeys.getRepo(repoUrl),
    queryFn: () => getRepo(repoUrl),
    enabled
  });
};
