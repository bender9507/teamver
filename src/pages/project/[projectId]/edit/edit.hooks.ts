import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
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
import type Create from "./index.page";

export const useEdit = ({ user }: ComponentProps<typeof Create>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const projectId = router.query.projectId as string;

  const { mount, unmount } = useModal();
  const { toast } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const [currentDateType, setCurrentDateType] = useState("");

  const { data: project } = useSelectProjectQuery(Number(projectId));

  const { mutate: updateProjectMutate } = useUpdateProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects());

      router.push(routes.profile(user.id));
    }
  });
  const { mutateAsync: uploadProjectImageMutateAsync } = useUploadProjectImageMutate();

  const { register, handleSubmit, watch, control, setValue, formState } = useForm<ProjectEditForm>({
    defaultValues: {
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
    project,
    currentDateType,
    setCurrentDateType,
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
