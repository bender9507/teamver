export interface ToastStyleProps {
  type?: "info" | "success" | "warning" | "error";
}

export interface ToastProps extends ToastStyleProps {
  id: string;
  message: string;
}
