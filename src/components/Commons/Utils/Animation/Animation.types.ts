import type { KeyframeProperties } from "~/styles/animation";

export interface AnimationProps {
  mode?: "in" | "out" | "none";
  delay?: number;
  start: KeyframeProperties;
  end: KeyframeProperties;
}
