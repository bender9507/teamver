import type { InputHTMLAttributes, ReactElement } from "react";
import type { ColorsKey } from "~/styles/theme";

export interface InputStyleProps {
  color?: ColorsKey;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "color">,
    InputStyleProps {
  rightElement?: ReactElement;
}
