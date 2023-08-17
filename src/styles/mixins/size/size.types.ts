import type { CSSProperties } from "react";

export interface SizeProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  minWidth?: CSSProperties["minWidth"];
  minHeight?: CSSProperties["minHeight"];
  maxWidth?: CSSProperties["maxWidth"];
  maxHeight?: CSSProperties["maxHeight"];
  fullScreen?: boolean;
}
