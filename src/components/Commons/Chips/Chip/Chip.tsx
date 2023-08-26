import type { HTMLAttributes, PropsWithChildren } from "react";
import * as Styled from "./Chip.styles";
import type { ChipProps } from "./Chip.types";

export const Chip = ({
  children,
  ...props
}: PropsWithChildren<ChipProps> & HTMLAttributes<HTMLSpanElement>) => {
  return <Styled.Container {...props}> {children}</Styled.Container>;
};
