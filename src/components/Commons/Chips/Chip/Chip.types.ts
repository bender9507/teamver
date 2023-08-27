import type { ColorsKey, SizesKey } from "~/styles/theme";

export interface ChipProps {
  isSelected?: boolean;
  size?: SizesKey;
  color?: ColorsKey;
}
