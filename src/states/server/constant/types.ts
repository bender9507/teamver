import type { constantMap } from "./constants";

export type ConstantMapKey = keyof typeof constantMap;

export type SelectedConstantMap<T extends ConstantMapKey[]> = {
  [K in T[number]]: (typeof constantMap)[K];
};
