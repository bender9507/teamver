import type { InputHTMLAttributes } from "react";
import type { ColorsKey } from "~/styles/theme";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  color?: ColorsKey;
  blurFocus?: boolean;
}
