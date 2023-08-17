import type { ButtonHTMLAttributes, CSSProperties } from "react";
import type * as svgList from "~/assets/icons";
import type { ColorsKey } from "~/styles/theme";

export interface IconButtonStyleProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  color?: ColorsKey;
}

export interface IconButtonProps
  extends IconButtonStyleProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  name: keyof typeof svgList;
}
