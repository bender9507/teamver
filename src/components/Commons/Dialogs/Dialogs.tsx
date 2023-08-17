import { useState, type MouseEvent, type PropsWithChildren } from "react";
import { useLockBodyScroll } from "react-use";
import { useOverlayStore } from "~/states/client";
import * as Styled from "./Dialogs.styles";
import type { DialogsProps } from "./Dialogs.types";

export const Dialogs = ({
  id,
  allowClickOutside = true,
  children
}: PropsWithChildren<DialogsProps>) => {
  const { unmount } = useOverlayStore();

  const [isVibration, setIsVibration] = useState(false);

  const handleClose = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (!allowClickOutside) {
      setIsVibration(true);

      setTimeout(() => setIsVibration(false), 300);
      return;
    }

    if (target === currentTarget) unmount(id);
  };

  useLockBodyScroll(true);

  return (
    <Styled.Outer onClick={handleClose}>
      <Styled.Inner isVibration={isVibration}>{children}</Styled.Inner>
    </Styled.Outer>
  );
};
