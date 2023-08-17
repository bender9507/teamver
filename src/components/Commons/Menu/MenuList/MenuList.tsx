import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { useMenuContext } from "../Menu";
import * as Styled from "./MenuList.styles";
import type { MenuListProps } from "./MenuList.types";

export const MenuList = ({ children, ...props }: PropsWithChildren<MenuListProps>) => {
  const { anchorEl } = useMenuContext();

  const menuListRef = useRef<HTMLUListElement>(null);

  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (menuListRef.current) {
      setHeight(menuListRef.current.offsetHeight);
    }
  }, [anchorEl]);

  if (!anchorEl) {
    return null;
  }

  return (
    <Styled.Container ref={menuListRef} height={height} {...props}>
      {children}
    </Styled.Container>
  );
};
