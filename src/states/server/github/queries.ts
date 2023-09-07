import { useQuery } from "@tanstack/react-query";
import { getRepos } from "./apis";
import { githubKeys } from "./keys";

export const useGetReposQuery = (username: string) => {
  return useQuery({
    queryKey: githubKeys.getRepos(username),
    queryFn: () => getRepos(username),
    initialData: []
  });
};
