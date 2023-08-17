import type { ButtonHTMLAttributes } from "react";
import type { SizesKey } from "~/styles/theme";

export interface ButtonStyleProps {
  variant?: "primary" | "secondary" | "borderless";
  shape?: "square" | "circle";
  size?: SizesKey;
}

export type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>;
