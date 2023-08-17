import type { MouseEvent, PropsWithChildren } from "react";
import { useLockBodyScroll } from "react-use";
import { useModal } from "./Modal.hooks";
import * as Styled from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

export const Modal = ({ id, children }: PropsWithChildren<ModalProps>) => {
  const { unmount } = useModal();

  const handleClose = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (target !== currentTarget) return;

    unmount(id);
  };

  useLockBodyScroll(true);

  return (
    <Styled.Outer onClick={handleClose}>
      <Styled.Inner>{children}</Styled.Inner>
    </Styled.Outer>
  );
};
