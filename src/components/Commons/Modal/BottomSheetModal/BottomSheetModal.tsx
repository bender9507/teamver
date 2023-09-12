import { useRef, type PropsWithChildren } from "react";
import Sheet from "react-modal-sheet";
import { useMount } from "react-use";
import { useBoolean } from "~/hooks";
import { useModal } from "..";
import type { ModalProps } from "../Modal.types";
import * as Styled from "./BottomSheetModal.styles";

export const BottomSheetModal = ({ children, id }: PropsWithChildren<ModalProps>) => {
  const [isOpen, setIsOpen] = useBoolean(false);

  const container = useRef<HTMLDivElement>(document.getElementById("container") as HTMLDivElement);

  const { unmount } = useModal();

  const handleClose = () => {
    setIsOpen.off();

    setTimeout(() => unmount(id), 200);
  };

  useMount(() => {
    setIsOpen.on();
  });

  return (
    <Styled.StyleSheet
      isOpen={isOpen}
      onClose={handleClose}
      detent="content-height"
      mountPoint={container.current}
    >
      <Sheet.Container>
        <Sheet.Header>
          <Styled.SheetHeaderBox>
            <Styled.SheetHeader />
          </Styled.SheetHeaderBox>
        </Sheet.Header>

        <Sheet.Content disableDrag>
          <Sheet.Scroller>{children}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={handleClose} />
    </Styled.StyleSheet>
  );
};
