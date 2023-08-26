import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "./keys";

export const useGetProjectsQuery = () => {
  return useQuery({
    queryKey: projectKeys.getTodos(),
    queryFn: getTodos,
    initialData: []
  });
};
