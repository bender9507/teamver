import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "~/components/Commons";
import { useImmutableState } from "~/hooks";
import type { ConstantProjectTypeRow } from "~/states/server/constant";
import { useGetConstantQuery } from "~/states/server/constant";
import {
  useInsertFollowProjectMutate,
  useSelectRecommendedProjectsQuery
} from "~/states/server/project";
import type Member from "./index.page";

const SEED = Math.random();

export const useMember = ({ user }: ComponentProps<typeof Member>) => {
  const [selectedItem, setSelectedItem] = useImmutableState<Record<string, boolean>>({});
  const [selectedProjectType, setSelectedProjectType] = useState<ConstantProjectTypeRow>();

  const { mount, unmount } = useModal();
  const { register, handleSubmit } = useForm<{ projectType: ConstantProjectTypeRow["id"] }>();

  const { data: constants } = useGetConstantQuery(["projectTypes"]);
  const { data: randomProjects, fetchNextPage } = useSelectRecommendedProjectsQuery({
    seedValue: SEED,
    userId: user.id,
    projectType: selectedProjectType?.id
  });

  const { mutate: insertFollowProject } = useInsertFollowProjectMutate();

  const filteredRandomProjects = useMemo(
    () =>
      randomProjects?.pages
        .map((page) => page.data)
        .flat()
        .filter((item) => !selectedItem[Number(item.id)]) ?? [],
    [randomProjects?.pages, selectedItem]
  );

  const handleChangeProjectType: Parameters<typeof handleSubmit>[0] = ({ projectType }) => {
    const selectedProjectType = constants.projectTypes.find(
      (_projectType) => _projectType.id === Number(projectType)
    );

    setSelectedProjectType(selectedProjectType);

    unmount("selectProjectType");
  };

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
    constants,
    randomProjects,
    fetchNextPage,
    register,
    handleSubmit,
    selectedProjectType,
    handleChangeProjectType,
    handleConfirm,
    handleCancel,
    filteredRandomProjects
  };
};
