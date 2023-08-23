import type { ConstantMapKey } from "./types";

const CONSTANT_KEY = "CONSTANT";

export const constantKeys = {
  getConstants: (tables: ConstantMapKey[]) => [CONSTANT_KEY, "getConstants", ...tables] as const
} as const;
