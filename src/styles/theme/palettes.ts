import { darkShadows, lightShadows } from "./shadows";

export const lightPalettes = {
  blue: {
    base: "#0085FF",
    hover: "#339DFF",
    pressed: "#1272CC",
    border: "#CCE7FF",
    background: "#E5F3FF",
    shadow: lightShadows.focusedBlue
  } as const,
  green: {
    base: "#00BA34",
    hover: "#33C85D",
    pressed: "#00952A",
    border: "#CCF1D6",
    background: "#E5F8EB",
    shadow: lightShadows.focusedGreen
  } as const,
  orange: {
    base: "#F98600",
    hover: "#FA9E33",
    pressed: "#C76B00",
    border: "#FEE7CC",
    background: "#FFF5E7",
    shadow: lightShadows.focusedOrange
  } as const,
  red: {
    base: "#E92C2C",
    hover: "#ED5656",
    pressed: "#BA2323",
    border: "#FBD5D5",
    background: "#FFEBEB",
    shadow: lightShadows.focusedRed
  } as const,
  pink: {
    base: "#E92C9E",
    hover: "#ED56B1",
    pressed: "#BA237E",
    border: "#FBD5EB",
    background: "#FDEAF5",
    shadow: lightShadows.focusedPink
  } as const,
  violet: {
    base: "#8B2CE9",
    hover: "#A256ED",
    pressed: "#6F23BA",
    border: "#E7D5FB",
    background: "#F3EAFD",
    shadow: lightShadows.focusedViolet
  } as const
} as const;

export const darkPalettes = {
  blue: {
    base: "#168FFF",
    hover: "#44A5FF",
    pressed: "#1272CC",
    border: "#193148",
    background: "#1A2631",
    shadow: darkShadows.focusedBlue
  } as const,
  green: {
    base: "#18CB49",
    hover: "#46D56D",
    pressed: "#12A23A",
    border: "#193D23",
    background: "#1A2C20",
    shadow: darkShadows.focusedGreen
  } as const,
  orange: {
    base: "#FF9F2D",
    hover: "#FFB157",
    pressed: "#CC7F25",
    border: "#48361E",
    background: "#48361E",
    shadow: darkShadows.focusedOrange
  } as const,
  red: {
    base: "#F74141",
    hover: "#F96767",
    pressed: "#C63434",
    border: "#462222",
    background: "#301E1E",
    shadow: darkShadows.focusedRed
  } as const,
  pink: {
    base: "#F03EA9",
    hover: "#F365BA",
    pressed: "#C03287",
    border: "#442136",
    background: "#2E1E28",
    shadow: darkShadows.focusedPink
  } as const,
  violet: {
    base: "#963AF2",
    hover: "#AB61F5",
    pressed: "#782EC2",
    border: "#332044",
    background: "#261D30",
    shadow: darkShadows.focusedViolet
  } as const
} as const;
