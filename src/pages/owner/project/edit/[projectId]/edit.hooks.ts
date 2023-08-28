import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { useBoolean } from "~/hooks";
import { useGetConstantQuery } from "~/states/server/constant";
import {
  projectsKey,
  useSelectProjectQuery,
  useUpdateProjectMutate
} from "~/states/server/project";
import { useUploadProjectImageMutate } from "~/states/server/storage";

import type { ProjectEditForm } from "./edit.types";
import type Create from "./index.page";

export const useEdit = ({ user, project }: ComponentProps<typeof Create>) => {
  const queryClient = useQueryClient();

  const { mount, unmount } = useModal();
  const { toast } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const { data: projectData } = useSelectProjectQuery(String(project.id));

  const { mutate: updateProjectMutate } = useUpdateProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects());
    }
  });
  const { mutateAsync: uploadProjectImageMutateAsync } = useUploadProjectImageMutate();

  const { register, handleSubmit, watch, control, setValue, formState } = useForm<ProjectEditForm>({
    defaultValues: { startDate: null, endDate: null },
    mode: "all"
  });

  const { data: constants } = useGetConstantQuery([
    "projectTypes",
    "positions",
    "languages",
    "skills",
    "areas"
  ]);

  const handleEditProject: Parameters<typeof handleSubmit>[0] = async ({
    imageUrl: imageFile,
    startDate,
    endDate,
    ...rest
  }) => {
    const { publicUrl: imageUrl } = await uploadProjectImageMutateAsync({
      file: imageFile,
      name: `${user.id}_${new Date().getTime()}`
    });

    updateProjectMutate({
      id: projectData.id,
      ownerId: user.id,
      startDate: startDate?.toDateString(),
      endDate: endDate?.toDateString(),
      imageUrl,
      ...rest
    });
  };

  useEffect(() => {
    watch(({ startDate, endDate }) => {
      if (startDate && endDate) {
        const diff = dayjs(startDate).diff(endDate, "ms");

        if (diff > 0) {
          toast({ type: "warning", message: "종료일은 시작일보다 빠를 수 없습니다." });
          setValue("endDate", null);
        }
      }
    });
  }, [watch, setValue, toast]);

  return {
    control,
    constants,
    formState,
    register,
    handleSubmit,
    handleEditProject,
    watch,
    mount,
    unmount,
    setValue,
    startDateIsOpen,
    setStartDateIsOpen,
    endDateIsOpen,
    setEndDateIsOpen
  };
};
