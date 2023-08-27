import type { InputHTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";
import * as Styled from "./RadioChip.styles";
import type { RadioChipProps } from "./RadioChip.types";

export const RadioChip = forwardRef<
  HTMLInputElement,
  PropsWithChildren<RadioChipProps> & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">
>(({ children, color, size, ...props }, ref) => {
  return (
    <Styled.Container>
      <Styled.Input ref={ref} type="radio" hidden {...props} />

      <Styled.Chip color={color} size={size}>
        {children}
      </Styled.Chip>
    </Styled.Container>
  );
});
