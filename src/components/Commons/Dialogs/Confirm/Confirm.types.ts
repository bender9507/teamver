import type { ReactNode } from "react";

export interface ConfirmProps {
  id: string;
  title: string;
  message?: string | ReactNode;
  confirmLabel?: string;
  onConfirm: VoidFunction;
  cancelLabel?: string;
  onCancel?: VoidFunction;
}
