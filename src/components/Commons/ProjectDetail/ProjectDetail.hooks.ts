import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { ProfileAllDataRow } from "~/states/server/profile";
import type { ProjectAllDataRow } from "~/states/server/project";
import { projectsKey, useInsertFollowProjectMutate } from "~/states/server/project";

export const useProjectDetail = (project: ProjectAllDataRow, profile: ProfileAllDataRow) => {
  const queryClient = useQueryClient();

  const [isBookmarked, setIsBookmarked] = useState(false);

  const { mutate: insertFollowProject } = useInsertFollowProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectFollowProjects(profile.id));
    }
  });

  const handleToggleBookmark = () => {
    insertFollowProject({ followerId: profile.id, projectId: project.id });
    setIsBookmarked(true);
  };

  return { handleToggleBookmark, isBookmarked };
};
