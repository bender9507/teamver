import { darkColors, lightColors } from "./colors";
import { opacities } from "./opacities";
import { darkPalettes, lightPalettes } from "./palettes";
import { darkShadows, lightShadows } from "./shadows";
import { sizes } from "./sizes";
import type { ThemeStyle } from "./types";
import { zIndex } from "./zIndex";

const sharedTheme = {
  sizes,
  opacities,
  zIndex
} as const;

export const darkTheme: ThemeStyle = {
  ...sharedTheme,
  colors: darkColors,
  shadows: darkShadows,
  palettes: darkPalettes
} as const;

export const lightTheme: ThemeStyle = {
  ...sharedTheme,
  colors: lightColors,
  shadows: lightShadows,
  palettes: lightPalettes
} as const;

export * from "./types";
