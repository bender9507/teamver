import type { ReactNode } from "react";
import { useCallback } from "react";
import { useOverlayStore } from "~/states/client";
import { Modal } from "./Modal";
import type { ModalProps } from "./Modal.types";

export const useModal = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayStore();

  const mount = useCallback(
    (element: ReactNode, props: ModalProps) => {
      _mount(props.id, <Modal {...props}>{element}</Modal>);
    },
    [_mount]
  );

  const unmount = useCallback(
    (name: string) => {
      _unmount(name);
    },
    [_unmount]
  );

  return { mount, unmount };
};
