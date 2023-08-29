import { forwardRef, type InputHTMLAttributes, type PropsWithChildren } from "react";
import * as Styled from "./SelectChip.styles";
import type { SelectChipProps } from "./SelectChip.types";

export const SelectChip = forwardRef<
  HTMLInputElement,
  PropsWithChildren<SelectChipProps> & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color">
>(({ children, color, size, type = "checkbox", ...props }, ref) => {
  return (
    <Styled.Container>
      <Styled.Input ref={ref} hidden type={type} {...props} />

      <Styled.Chip color={color} size={size}>
        {children}
      </Styled.Chip>
    </Styled.Container>
  );
});
