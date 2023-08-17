import type { CSSProperties } from "react";

export interface Position {
  top?: CSSProperties["top"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  left?: CSSProperties["left"];
}

export interface PositionProps extends Position {
  position?: CSSProperties["position"];
}

export type PosCenterXProps = Omit<PositionProps, "left">;

export type PosCenterYProps = Omit<PositionProps, "top">;
