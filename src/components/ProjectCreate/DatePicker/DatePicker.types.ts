export interface DatePickerProps {
  onChangeDate?: (date: { startDate: Date | null; endDate: Date | null }) => void;
}
