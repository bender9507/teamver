import type { ConstantMapKey } from "./types";

const CONSTANT_KEY = "CONSTANT";

export const constantKeys = {
  getConstants: (tables: Readonly<ConstantMapKey[]>) =>
    [CONSTANT_KEY, "getConstants", ...tables] as const,
  selectConstants: () => [CONSTANT_KEY, "selectConstants"] as const
} as const;
