import type { InputHTMLAttributes } from "react";
import type { SizesKey } from "~/styles/theme";

export interface InputStyleProps {
  styleSize?: SizesKey;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    Omit<InputStyleProps, "styleSize"> {
  size?: SizesKey;
}
