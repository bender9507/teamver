import type { CSSProperties } from "react";
import type { FLEX_MAP } from "./flex";

type FlexMapKey = keyof typeof FLEX_MAP;

export interface FlexProps {
  display?: CSSProperties["display"];
  direction?: CSSProperties["flexDirection"];
  align?: FlexMapKey;
  justify?: FlexMapKey;
  gap?: CSSProperties["gap"];
  wrap?: CSSProperties["flexWrap"];
  padding?: CSSProperties["padding"];
}

export type FlexColumnProps = Omit<FlexProps, "direction">;

export type FlexCenterProps = Omit<FlexProps, "align" | "justify">;
