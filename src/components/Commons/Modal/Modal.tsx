import type { MouseEvent, PropsWithChildren } from "react";
import { useLockBodyScroll } from "react-use";
import { useModal } from "./Modal.hooks";
import * as Styled from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

export const Modal = ({ id, children, type, background }: PropsWithChildren<ModalProps>) => {
  const { unmount } = useModal();

  const handleClose = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (target !== currentTarget) return;

    unmount(id);
  };

  useLockBodyScroll(true);

  return (
    <Styled.Outer onClick={handleClose} type={type} background={background}>
      <Styled.Inner type={type}>{children}</Styled.Inner>
    </Styled.Outer>
  );
};
