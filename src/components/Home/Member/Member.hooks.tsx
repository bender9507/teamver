import type { ComponentProps } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import { useCardSelect, useImmutableState } from "~/hooks";
import { useGetConstantQuery } from "~/states/server/constant";
import { useSelectProfileQuery } from "~/states/server/profile";
import {
  useInsertFollowProjectMutate,
  useSelectRecommendedProjectsQuery
} from "~/states/server/project";
import type { Member } from "./Member";
import type { FilterForm } from "./member.types";

const SEED = Math.random();

export const useMember = ({ user }: ComponentProps<typeof Member>) => {
  const [filter, setFilter] = useImmutableState<FilterForm>({
    areas: []
  });

  const { mount, unmount } = useModal();
  const { register, handleSubmit } = useForm<FilterForm>();

  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: constants } = useGetConstantQuery(["projectTypes", "areas"]);
  const { data: randomProjects, fetchNextPage } = useSelectRecommendedProjectsQuery({
    seedValue: SEED,
    userId: user.id,
    ...filter
  });

  const {
    filteredCards: filteredRandomProjects,
    handleAccept,
    handleReject,
    handleRestore
  } = useCardSelect(randomProjects?.pages.map((page) => page.data).flat() ?? [], (projectId) =>
    insertFollowProject({ followerId: user.id, projectId: projectId as number })
  );

  const { mutate: insertFollowProject } = useInsertFollowProjectMutate();

  const handleChangeFilter = handleSubmit(({ projectType, areas }) => {
    setFilter({ areas: areas || [], projectType });

    unmount("selectProjectType");
    unmount("selectLanguages");
  });

  useEffect(() => {
    if (filteredRandomProjects.length <= 1) {
      fetchNextPage();
    }
  }, [fetchNextPage, filteredRandomProjects]);

  return {
    mount,
    profile,
    filter,
    constants,
    register,
    handleChangeFilter,
    handleAccept,
    handleReject,
    handleRestore,
    filteredRandomProjects
  };
};
