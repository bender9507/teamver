import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { routes } from "~/constants/routes";
import { useBoolean } from "~/hooks";
import { useSelectConstantsQuery } from "~/states/server/constant";
import {
  projectsKey,
  useSelectProjectQuery,
  useUpdateProjectMutate
} from "~/states/server/project";
import { useUploadProjectImageMutate } from "~/states/server/storage";
import type { ProjectForm } from "../components/ProjectForm/ProjectForm.types";

export const useEdit = () => {
  const user = useUser() as User;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation("project");

  const { toast, confirm } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const [isStartIndefinite, setStartIsIndefinite] = useState(false);
  const [isEndIndefinite, setEndIsIndefinite] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectId = Number(router.query.projectId);
  const { data: project } = useSelectProjectQuery(projectId);

  const { mutate: updateProjectMutate } = useUpdateProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects(user.id));
      router.push({ pathname: routes.profile, query: { userId: user.id } });
    },

    onError: () => toast({ type: "error", message: t("프로젝트 수정에 실패했습니다.") })
  });

  const { mutateAsync: uploadProjectImageMutateAsync } = useUploadProjectImageMutate();

  const { register, handleSubmit, watch, control, setValue, formState } = useForm<ProjectForm>({
    defaultValues: {
      name: project.name,
      description: project.description,
      recruitCount: project.recruitCount,
      startDate: project.startDate ? dayjs(project.startDate).toDate() : "미정",
      endDate: project.endDate ? dayjs(project.endDate).toDate() : "미정",
      positions: project.positions.map((el) => el.id),
      projectType: project.projectType.id,
      skills: project.skills.map((el) => el.id),
      languages: project.languages.map((el) => el.id),
      areas: project.areas.map((el) => el.id)
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
      setIsSubmitting(true);

      const updatedData = {
        id: project.id,
        ownerId: user.id,
        startDate: isStartIndefinite || startDate === "미정" ? null : startDate?.toDateString(),
        endDate: isEndIndefinite || endDate === "미정" ? null : endDate?.toDateString(),
        positions: positions.map((position) => position),
        projectType,
        skills: skills.map((skill) => skill),
        languages: languages.map((language) => language),
        areas: areas.map((area) => area),
        ...rest
      };

      if (imageFile) {
        const { publicUrl } = await uploadProjectImageMutateAsync({
          file: imageFile,
          name: `${user.id}_${new Date().getTime()}`
        });

        updateProjectMutate({ ...updatedData, imageUrl: publicUrl });
      } else {
        updateProjectMutate(updatedData);
      }
    }
  );

  useEffect(() => {
    watch(({ startDate, endDate }) => {
      if (!(startDate instanceof Date)) {
        setStartIsIndefinite(true);
      } else {
        setStartIsIndefinite(false);
      }

      if (!(endDate instanceof Date)) {
        setEndIsIndefinite(true);
      } else if (startDate && endDate) {
        const diff = dayjs(startDate).diff(endDate, "ms");

        if (diff > 0) {
          toast({ type: "warning", message: t("종료일은 시작일보다 빠를 수 없습니다") });
          setValue("endDate", null);
        }
      }
    });
  }, [watch, setValue, toast, t]);

  useEffect(() => {
    setStartIsIndefinite(!project.startDate);
    setEndIsIndefinite(!project.endDate);
  }, [project]);

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
    handleEditProject,
    watch,
    setValue,
    isSubmitting,
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
