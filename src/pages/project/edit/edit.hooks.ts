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
import { useBoolean } from "~/hooks";
import { useSelectConstantsQuery } from "~/states/server/constant";
import {
  projectsKey,
  useSelectProjectQuery,
  useUpdateProjectMutate
} from "~/states/server/project";
import { useUploadProjectImageMutate } from "~/states/server/storage";

import { routes } from "~/constants/routes";
import type { ProjectEditForm } from "./edit.types";

export const useEdit = () => {
  const user = useUser() as User;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation("project");

  const projectId = router.query.projectId as string;

  const { mount, unmount } = useModal();
  const { toast, confirm } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const [isStartIndefinite, setStartIsIndefinite] = useState<boolean>();
  const [isEndIndefinite, setEndIsIndefinite] = useState<boolean>();

  const { data: project } = useSelectProjectQuery(Number(projectId));

  const { mutate: updateProjectMutate } = useUpdateProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects(user.id));

      router.push({ pathname: routes.profile, query: { userId: user.id } });
    }
  });
  const { mutateAsync: uploadProjectImageMutateAsync } = useUploadProjectImageMutate();

  const { register, handleSubmit, watch, control, setValue, formState } = useForm<ProjectEditForm>({
    defaultValues: {
      name: project.name,
      description: project.description,
      recruitCount: project.recruitCount,
      startDate: null,
      endDate: null,
      positions: project.positions.map((el) => String(el.id)),
      projectType: String(project.projectType.id),
      skills: project.skills.map((el) => String(el.id)),
      languages: project.languages.map((el) => String(el.id)),
      areas: project.areas.map((el) => String(el.id))
    },
    mode: "all"
  });

  const { data: constants } = useSelectConstantsQuery();

  const handleEditProject = handleSubmit(
    async ({
      imageUrl: imageFile,
      startDate,
      endDate,
      positions,
      projectType,
      skills,
      languages,
      areas,
      ...rest
    }) => {
      if (!imageFile) {
        updateProjectMutate({
          id: project.id,
          ownerId: user.id,
          startDate: startDate?.toDateString(),
          endDate: endDate?.toDateString(),
          positions: positions.map((position) => Number(position)),
          projectType: Number(projectType),
          skills: skills.map((skill) => Number(skill)),
          languages: languages.map((language) => Number(language)),
          areas: areas.map((area) => Number(area)),
          ...rest
        });

        return;
      }

      const { publicUrl: imageUrl } = await uploadProjectImageMutateAsync({
        file: imageFile,
        name: `${user.id}_${new Date().getTime()}`
      });

      updateProjectMutate({
        id: project.id,
        ownerId: user.id,
        startDate: startDate?.toDateString(),
        endDate: endDate?.toDateString(),
        imageUrl,
        positions: positions.map((position) => Number(position)),
        projectType: Number(projectType),
        skills: skills.map((skill) => Number(skill)),
        languages: languages.map((language) => Number(language)),
        areas: areas.map((area) => Number(area)),
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

  useEffect(() => {
    console.log(1);
    setStartIsIndefinite(!project.startDate);
    setEndIsIndefinite(!project.endDate);
  }, [project]);

  // const startDateValue = (() => {
  //   if (watch("startDate")) {
  //     return dayjs(watch("startDate")).format("DD. MM. YYYY");
  //   }

  //   if (project.startDate === null) {
  //     return t("미정");
  //   }

  //   return dayjs(project.startDate).format("DD. MM. YYYY");
  // })();

  // const endDateValue = (() => {
  //   if (watch("endDate")) {
  //     return dayjs(watch("endDate")).format("DD. MM. YYYY");
  //   }

  //   if (project.endDate === null) {
  //     return t("미정");
  //   }

  //   return dayjs(project.endDate).format("DD. MM. YYYY");
  // })();

  const handleBack = async () => {
    const confirmed = await confirm({
      title: t("프로젝트를 수정하지 않고 그냥 나가시겠어요")
    });

    return confirmed;
  };

  return {
    control,
    constants,
    formState,
    project,

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
    setEndDateIsOpen,
    handleBack,
    isStartIndefinite,
    setStartIsIndefinite,
    isEndIndefinite,
    setEndIsIndefinite

    // endDateValue,
    // startDateValue
  };
};
