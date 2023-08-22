import type { PropsWithChildren } from "react";
import * as Styled from "./Chip.styles";
import type { ChipProps } from "./Chip.types";

export const Chip = ({ children, color }: PropsWithChildren<ChipProps>) => {
  return <Styled.Container color={color}>{children}</Styled.Container>;
};
