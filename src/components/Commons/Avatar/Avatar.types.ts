import type Image from "next/image";
import type { ComponentProps } from "react";
import type { SizesKey } from "~/styles/theme";

export interface AvatarStyleProps {
  size?: SizesKey | "xLarge" | "fill";
  shape?: "square" | "circle";
}

export interface AvatarProps
  extends AvatarStyleProps,
    Pick<ComponentProps<typeof Image>, "priority" | "loading" | "quality"> {
  src: string;
}
