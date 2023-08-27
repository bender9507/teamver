import type { InputHTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";
import { Chip } from "~/components/Commons";
import * as Styled from "./RadioChip.styles";
import type { RadioChipProps } from "./RadioChip.types";

export const RadioChip = forwardRef<
  HTMLInputElement,
  PropsWithChildren<RadioChipProps> & InputHTMLAttributes<HTMLInputElement>
>(({ children, chipProps, ...props }, ref) => {
  return (
    <Styled.Container>
      <Styled.Input ref={ref} type="radio" hidden {...props} />

      <Chip {...chipProps}>{children}</Chip>
    </Styled.Container>
  );
});
