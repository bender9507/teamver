import type { constantMap } from "./apis";

export type ConstantMapKey = keyof typeof constantMap;

export type SelectedConstantMap<T extends ConstantMapKey[]> = {
  [K in T[number]]: Awaited<ReturnType<(typeof constantMap)[K]>>;
};
