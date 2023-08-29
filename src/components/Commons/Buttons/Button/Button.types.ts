import type { ButtonHTMLAttributes } from "react";
import type { ColorsKey, SizesKey } from "~/styles/theme";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: ColorsKey;
  color?: ColorsKey;
  size?: SizesKey;
}
