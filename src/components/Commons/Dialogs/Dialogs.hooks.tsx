import type { ReactNode } from "react";
import { useCallback } from "react";
import { useOverlayStore } from "~/states/client";
import { uuid } from "~/utils";
import { Confirm } from "./Confirm";
import type { ConfirmProps } from "./Confirm/Confirm.types";
import { Toast } from "./Toast";
import type { ToastProps } from "./Toast/Toast.types";

export const useDialog = () => {
  const { mount, unmount } = useOverlayStore();

  const render = useCallback(
    (
      onRender: (id: string, resolve: (value: boolean | PromiseLike<boolean>) => void) => ReactNode
    ) => {
      const id = uuid();

      return new Promise((_resolve) => {
        mount(id, onRender(id, _resolve));
      }) as Promise<boolean>;
    },
    [mount]
  );

  const confirm = useCallback(
    (props: Omit<ConfirmProps, "id" | "onConfirm" | "onCancel">) =>
      render((id, resolve) => (
        <Confirm
          {...props}
          id={id}
          onConfirm={() => {
            resolve(true);
            unmount(id);
          }}
          onCancel={() => {
            resolve(false);
            unmount(id);
          }}
        />
      )),
    [render, unmount]
  );

  const toast = useCallback(
    (props: Omit<ToastProps, "id">) => render((id) => <Toast {...props} id={id} />),
    [render]
  );

  return {
    confirm,
    toast
  };
};
