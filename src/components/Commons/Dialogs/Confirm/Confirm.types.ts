import type { AlertProps } from "../Alert";

export interface ConfirmProps extends AlertProps {
  cancelLabel?: string;
  onCancel?: VoidFunction;
}
