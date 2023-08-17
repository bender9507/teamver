import type { LiHTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import { useCallback } from "react";
import { useMenuContext } from "../Menu";
import * as Styled from "./MenuItem.styles";

export const MenuItem = ({
  children,
  onClick,
  ...props
}: PropsWithChildren<LiHTMLAttributes<HTMLLIElement>>) => {
  const { handleMenuClose } = useMenuContext();

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      if (onClick) onClick(event);

      handleMenuClose();
    },
    [handleMenuClose, onClick]
  );

  return (
    <Styled.Container {...props} onClick={handleOnClick}>
      {children}
    </Styled.Container>
  );
};
