import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { routes } from "~/constants/routes";
import { useBoolean } from "~/hooks";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { projectsKey, useInsertProjectMutate } from "~/states/server/project";
import { useUploadProjectImageMutate } from "~/states/server/storage";
import type { ProjectCreatorForm } from "./create.types";
import type Create from "./index.page";

export const useCreate = ({ user }: ComponentProps<typeof Create>) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mount, unmount } = useModal();
  const { toast } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const { mutate: insertProjectMutate } = useInsertProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects());

      router.push(routes.profile(user.id));
    }
  });
  const { mutateAsync: uploadProjectImageMutateAsync } = useUploadProjectImageMutate();

  const { register, handleSubmit, watch, control, setValue, formState } =
    useForm<ProjectCreatorForm>({
      defaultValues: { startDate: null, endDate: null },
      mode: "all"
    });

  const { data: constants } = useSelectConstantsQuery();

  const handleCreateProject = handleSubmit(
    async ({ imageUrl: imageFile, startDate, endDate, ...rest }) => {
      const { publicUrl: imageUrl } = await uploadProjectImageMutateAsync({
        file: imageFile,
        name: `${user.id}_${new Date().getTime()}`
      });

      insertProjectMutate({
        ownerId: user.id,
        startDate: startDate?.toDateString(),
        endDate: endDate?.toDateString(),
        imageUrl,
        ...rest
      });
    }
  );

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
    handleCreateProject,
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
