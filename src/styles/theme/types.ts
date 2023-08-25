import type { OneOf } from "~/types";
import type { colors } from "./colors";
import type { SIZE_KEY_LIST, sizes } from "./sizes";

export type Colors = typeof colors;
export type ColorsKey = keyof Colors;

export type Sizes = typeof sizes;
export type SizesKey = OneOf<typeof SIZE_KEY_LIST>;
