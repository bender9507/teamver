export interface ModalStyleProps {
  type?: "center" | "bottom";
  background?: "none" | "clear";
}

export interface ModalProps extends ModalStyleProps {
  id: string;
  onUnmount?: VoidFunction;
}
