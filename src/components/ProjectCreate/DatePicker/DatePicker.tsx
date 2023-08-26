import dayjs from "dayjs";
import Calendar from "react-calendar";
import { Controller } from "react-hook-form";
import { Button, Input } from "~/components/Commons";
import { FlexColumn, Text } from "~/styles/mixins";
import { useDatePicker } from "./DatePicker.hooks";
import type { DatePickerProps } from "./DatePicker.types";

export const DatePicker = (props: DatePickerProps) => {
  const app = useDatePicker(props);

  return (
    <FlexColumn as="form" gap={22} onSubmit={app.handleSubmit(app.handleChangeDate)}>
      <Text size="heading3">프로젝트 기간을 선택해주세요!</Text>

      <FlexColumn gap={8}>
        <Text>Start Date</Text>

        <Input
          readOnly
          placeholder="기간 선택하기"
          color="backgroundPrimary"
          value={app.watch("startDate") ? dayjs(app.watch("startDate")).format("DD. MM. YYYY") : ""}
          onClick={app.setStartIsOpen.toggle}
        />

        {app.startIsOpen && (
          <Controller
            name="startDate"
            control={app.control}
            render={({ field: { onChange } }) => (
              <Calendar
                onChange={(date) => {
                  app.setStartIsOpen.off();
                  onChange(date);
                }}
              />
            )}
          />
        )}
      </FlexColumn>

      <FlexColumn gap={8}>
        <Text>Due Date</Text>

        <Input
          color="backgroundPrimary"
          value={app.watch("endDate") ? dayjs(app.watch("endDate")).format("DD. MM. YYYY") : ""}
          readOnly
          placeholder="기간 선택하기"
          onClick={app.setEndIsOpen.toggle}
        />

        {app.endIsOpen && (
          <Controller
            name="endDate"
            control={app.control}
            render={({ field: { onChange } }) => (
              <Calendar
                onChange={(date) => {
                  app.setEndIsOpen.off();
                  onChange(date);
                }}
              />
            )}
          />
        )}
      </FlexColumn>

      <Button>확인</Button>
    </FlexColumn>
  );
};
