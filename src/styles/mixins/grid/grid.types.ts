import type { CSSProperties } from "react";
import type { GRID_MAP } from "./grid";

type GridMapKey = keyof typeof GRID_MAP;

export interface GridProps {
  column?: number;
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
  gap?: CSSProperties["gap"];
  autoColumnSize?: boolean;
  align?: GridMapKey;
  justify?: GridMapKey;
  padding?: CSSProperties["padding"];
}
