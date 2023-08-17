import type { DialogsProps } from "../Dialogs.types";

export interface AlertProps extends DialogsProps {
  title?: string;
  message: string;
  confirmLabel?: string;
  onConfirm: VoidFunction;
}
