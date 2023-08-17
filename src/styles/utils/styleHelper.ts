import type { CSSProperties } from "react";
import { numberToPx } from "./numberToPx";
import { toKebabCase } from "./toKebabCase";

export const styleHelper = (
  property: keyof CSSProperties,
  value: number | string | undefined
) => {
  return `${toKebabCase(property)}: ${numberToPx(value)};`;
};
