import dayjs from "dayjs";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { useBoolean } from "~/hooks";
import { useGetConstantQuery } from "~/states/server/constant";
import { useInsertProjectMutate } from "~/states/server/project";
import type { ProjectCreatorForm } from "./create.types";
import type Create from "./index.page";

export const useCreate = ({ user }: ComponentProps<typeof Create>) => {
  const { mount, unmount } = useModal();
  const { toast } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const { mutate: insertProjectMutate } = useInsertProjectMutate();

  const { register, handleSubmit, watch, control, setValue } = useForm<ProjectCreatorForm>({
    defaultValues: { startDate: null, endDate: null }
  });

  const { data: constants } = useGetConstantQuery([
    "projectTypes",
    "positions",
    "languages",
    "skills"
  ]);

  const handleCreateProject: Parameters<typeof handleSubmit>[0] = (data) => {
    console.log(data.startDate?.toDateString());

    // insertProjectMutate({ ...data, ownerId: user.id });
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
