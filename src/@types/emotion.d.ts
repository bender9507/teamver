/* eslint-disable */
import type { ThemeStyle } from "~/styles/theme";

declare module "@emotion/react" {
  type EmotionTheme = ThemeStyle;

  export interface Theme extends EmotionTheme {}
}
