export interface MenuListProps {
  vertical?: "top" | "bottom";
  anchor?: "left" | "right";
  gap?: number;
  full?: boolean;
}

export interface MenuListStyleProps extends MenuListProps {
  height: number;
}
