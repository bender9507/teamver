import type { ComponentProps } from "react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import { useImmutableState } from "~/hooks";
import { useGetConstantQuery } from "~/states/server/constant";
import { useSelectProfileQuery } from "~/states/server/profile";
import {
  useInsertFollowProjectMutate,
  useSelectRecommendedProjectsQuery
} from "~/states/server/project";
import type Member from "./index.page";
import type { FilterForm } from "./member.types";

const SEED = Math.random();

export const useMember = ({ user }: ComponentProps<typeof Member>) => {
  const [selectedItem, setSelectedItem] = useImmutableState<Record<string, boolean>>({});

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

  const { mutate: insertFollowProject } = useInsertFollowProjectMutate();

  const filteredRandomProjects = useMemo(
    () =>
      randomProjects?.pages
        .map((page) => page.data)
        .flat()
        .filter((item) => !selectedItem[Number(item.id)])
        .reverse() ?? [],
    [randomProjects?.pages, selectedItem]
  );

  const handleChangeFilter = handleSubmit(({ projectType, areas }) => {
    setFilter({ areas: areas || [], projectType });

    unmount("selectProjectType");
    unmount("selectLanguages");
  });

  const handleConfirm = (projectId: number) => {
    setSelectedItem({ [projectId]: true });

    insertFollowProject({ followerId: user.id, projectId });
  };

  const handleCancel = (projectId: number) => {
    setSelectedItem({ [projectId]: true });
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
    register,
    constants,
    randomProjects,
    fetchNextPage,
    handleChangeFilter,
    handleConfirm,
    handleCancel,
    filteredRandomProjects
  };
};
