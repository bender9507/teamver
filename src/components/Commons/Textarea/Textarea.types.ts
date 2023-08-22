import type { TextareaHTMLAttributes } from "react";
import type { SizesKey } from "~/styles/theme";

export interface TextareaStyleProps {
  styleSize?: SizesKey;
  resize?: "none" | "both" | "vertical" | "horizontal";
}

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "color">,
    Omit<TextareaStyleProps, "styleSize"> {
  size?: SizesKey;
}
