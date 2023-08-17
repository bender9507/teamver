import type { CSSProperties } from "react";
import { toKebabCase } from "~/styles/utils";
import { getObjectEntries } from "~/utils";
import type { Selectors } from "./selector.types";

export const SELECTORS = [
  "hover",
  "active",
  "focus",
  "enabled",
  "disabled",
  "checked",
  "valid",
  "invalid",
  "placeholder-shown",
  "last-child",
  "fist-child",
  "first-of-type"
] as const;

export const selector = (property: keyof CSSProperties, selectors: Selectors<typeof property>) =>
  getObjectEntries(selectors).map(
    ([key, value]) => `&:${key} { ${toKebabCase(property)} : ${value} }`
  );
