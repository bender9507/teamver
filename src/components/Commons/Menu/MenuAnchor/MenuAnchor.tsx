import { cloneElement } from "react";
import type { PropsWithElement } from "~/types";
import { useMenuContext } from "../Menu";

export const MenuAnchor = ({ children }: PropsWithElement) => {
  const { handleMenuToggle } = useMenuContext();

  const _children = cloneElement(children, { onClick: handleMenuToggle });

  return _children;
};
