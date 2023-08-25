/* eslint-disable */
import type { theme } from "~/styles/theme";

declare module "@emotion/react" {
  type EmotionTheme = typeof theme;

  export interface Theme extends EmotionTheme {}
}
