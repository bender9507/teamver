import type { CSSProperties } from "react";
import type { OneOf } from "~/types";
import type { SELECTORS } from "./selector";

type Sample =
  | `${OneOf<typeof SELECTORS>}`
  | `not(:${OneOf<typeof SELECTORS>})`
  | `${OneOf<typeof SELECTORS>}:not(:${OneOf<typeof SELECTORS>})`;

export type Selectors<T extends keyof CSSProperties> = {
  [Selector in Sample]?: CSSProperties[T];
};
