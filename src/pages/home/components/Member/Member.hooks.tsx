import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useModal } from "~/components/Commons";
import { useCardSelect, useImmutableState } from "~/hooks";
import { useSelectProfileQuery } from "~/states/server/profile";
import {
  useInsertFollowProjectMutate,
  useSelectRecommendedProjectsQuery
} from "~/states/server/project";
import type { FilterForm } from "./Member.types";

const SEED = Math.random();

export const useMember = () => {
  const [filter, setFilter] = useImmutableState<FilterForm>({
    areas: []
  });

  const { mount } = useModal();
  const user = useUser() as User;

  const { data: profile } = useSelectProfileQuery(user.id);

  const { data: randomProjects, fetchNextPage } = useSelectRecommendedProjectsQuery({
    seedValue: SEED,
    userId: user.id,
    ...filter
  });

  const { mutate: insertFollowProject } = useInsertFollowProjectMutate();

  const {
    filteredCards: filteredRandomProjects,
    handleAccept,
    handleReject,
    handleRestore
  } = useCardSelect(randomProjects?.pages.map((page) => page.data).flat() ?? [], (projectId) =>
    insertFollowProject({ followerId: user.id, projectId: projectId as number })
  );

  const handleChangeFilter = (key: string, values?: number | number[]) => {
    setFilter({ [key]: values });
  };

  useEffect(() => {
    if (filteredRandomProjects.length <= 1) {
      fetchNextPage();
    }
  }, [fetchNextPage, filteredRandomProjects]);

  return {
    mount,
    profile,
    filter,
    handleChangeFilter,
    handleAccept,
    handleReject,
    handleRestore,
    filteredRandomProjects
  };
};
