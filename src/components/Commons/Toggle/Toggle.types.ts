import type { InputHTMLAttributes, ReactElement } from "react";
import type { ColorsKey } from "~/styles/theme";

export interface ToggleStyleProps {
  bgColor?: ColorsKey;
}

export interface ToggleProps extends ToggleStyleProps, InputHTMLAttributes<HTMLInputElement> {
  icons?: {
    checked: ReactElement;
    unchecked: ReactElement;
  };
}
