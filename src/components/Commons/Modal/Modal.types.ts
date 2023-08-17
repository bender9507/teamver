import type { CSSProperties } from "react";

export interface ModalStyleProps {
  width?: CSSProperties["width"];
}

export interface ModalProps extends ModalStyleProps {
  id: string;
}
