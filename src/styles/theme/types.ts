import type { OneOf } from "~/types";
import type { darkColors, lightColors } from "./colors";
import type { opacities } from "./opacities";
import type { darkPalettes, lightPalettes } from "./palettes";
import type { darkShadows, lightShadows } from "./shadows";
import type { SIZE_KEY_LIST, sizes } from "./sizes";
import type { zIndex } from "./zIndex";

type ColorHex = `#${string}`;

type ThemeColorsKey = keyof typeof lightColors | keyof typeof darkColors;

type ThemeColors = Record<ThemeColorsKey, ColorHex>;

interface Palette {
  base: ColorHex;
  hover: ColorHex;
  pressed: ColorHex;
  border: ColorHex;
  background: ColorHex;
  shadow: string;
}

type ThemePalettesKey = keyof typeof lightPalettes | keyof typeof darkPalettes;

type ThemePalettes = Record<ThemePalettesKey, Palette>;

type ThemeShadowsKey = keyof typeof lightShadows | keyof typeof darkShadows;

type ThemeShadows = Record<ThemeShadowsKey, string>;

type ThemeSizes = typeof sizes;

type ThemeOpacities = typeof opacities;

type ThemeZIndex = typeof zIndex;

export interface ThemeStyle {
  colors: ThemeColors;
  shadows: ThemeShadows;
  sizes: ThemeSizes;
  opacities: ThemeOpacities;
  palettes: ThemePalettes;
  zIndex: ThemeZIndex;
}

export type Colors = ThemeStyle["colors"];
export type ColorsKey = keyof Colors;

export type Palettes = ThemeStyle["palettes"];
export type PalettesKey = keyof Palettes;

export type Opacities = ThemeStyle["opacities"];
export type OpacitiesKey = keyof Opacities;

export type Shadows = ThemeStyle["shadows"];
export type ShadowsKey = keyof Shadows;

export type Sizes = ThemeStyle["sizes"];
export type SizesKey = OneOf<typeof SIZE_KEY_LIST>;
