import type { ReactNode } from "react";
import type { DialogsProps } from "../Dialogs.types";

export interface AlertProps extends DialogsProps {
  title?: string;
  message: string | ReactNode;
  confirmLabel?: string;
  onConfirm: VoidFunction;
}
