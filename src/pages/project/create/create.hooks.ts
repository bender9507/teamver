import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { routes } from "~/constants/routes";
import { useBoolean } from "~/hooks";
import { useSelectConstantsQuery } from "~/states/server/constant";
import { projectsKey, useInsertProjectMutate } from "~/states/server/project";
import { useUploadProjectImageMutate } from "~/states/server/storage";
import type { ProjectCreatorForm } from "./create.types";

export const useCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUser() as User;

  const { t } = useTranslation("project");

  const { mount, unmount } = useModal();
  const { toast, confirm } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const [isStartIndefinite, setStartIsIndefinite] = useState(false);
  const [isEndIndefinite, setEndIsIndefinite] = useState(false);

  const { mutate: insertProjectMutate } = useInsertProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects(user.id));

      router.push({ pathname: routes.profile, query: { userId: user.id } });
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
          toast({ type: "warning", message: t("종료일은 시작일보다 빠를 수 없습니다") });
          setValue("endDate", null);
        }
      }
    });
  }, [watch, setValue, toast, t]);

  const handleBack = async () => {
    const result = await confirm({
      title: t("작성중인 프로젝트 글을 취소하고 그냥 나가시겠어요"),
      message: t("취소된 글은 저장되지 않아요")
    });

    return result;
  };

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
    setEndDateIsOpen,
    handleBack,
    isStartIndefinite,
    setStartIsIndefinite,
    isEndIndefinite,
    setEndIsIndefinite
  };
};
