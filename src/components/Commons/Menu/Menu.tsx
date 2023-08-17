import type { MouseEvent, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useClickAway } from "react-use";
// import { useClickAway } from "~/hooks";
import type { WithStyle } from "~/types";

const MenuContext = createContext<{
  anchorEl: HTMLElement | null;
  handleMenuOpen(event: MouseEvent<HTMLElement>): void;
  handleMenuClose(): void;
  handleMenuToggle(event: MouseEvent<HTMLElement>): void;
} | null>(null);

export const Menu = ({ children, style }: PropsWithChildren<WithStyle>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMenuOpen = useCallback(({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMenuToggle = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (anchorEl) {
        handleMenuClose();
      } else {
        handleMenuOpen(event);
      }
    },
    [anchorEl, handleMenuClose, handleMenuOpen]
  );

  const values = useMemo(
    () => ({
      anchorEl,
      handleMenuOpen,
      handleMenuClose,
      handleMenuToggle
    }),
    [anchorEl, handleMenuClose, handleMenuOpen, handleMenuToggle]
  );

  useClickAway(containerRef, handleMenuClose);

  return (
    <MenuContext.Provider value={values}>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          display: "inline-block",
          ...style
        }}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("useMenuContext is only available within Menu");
  }

  return menuContext;
};
