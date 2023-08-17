import type { CSSProperties } from "react";
import type * as svgList from "~/assets/icons";
import type { ColorsKey } from "~/styles/theme";

export interface IconStyleProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  color?: ColorsKey;
}

export interface IconProps extends IconStyleProps {
  name: keyof typeof svgList;
}
