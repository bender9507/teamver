import dayjs from "dayjs";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDialog, useModal } from "~/components/Commons";
import { useBoolean } from "~/hooks";
import { DATE_PICKER_MODAL, type DatePicker } from ".";

export const useDatePicker = ({ onChangeDate }: ComponentProps<typeof DatePicker>) => {
  const { unmount } = useModal();
  const { toast } = useDialog();

  const [startIsOpen, setStartIsOpen] = useBoolean();
  const [endIsOpen, setEndIsOpen] = useBoolean();

  const { control, watch, handleSubmit, setValue } = useForm<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    defaultValues: { startDate: null, endDate: null }
  });

  const handleChangeDate: Parameters<typeof handleSubmit>[0] = (data) => {
    if (onChangeDate) onChangeDate(data);

    unmount(DATE_PICKER_MODAL);
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
    watch,
    startIsOpen,
    endIsOpen,
    setStartIsOpen,
    setEndIsOpen,
    handleSubmit,
    handleChangeDate
  };
};
