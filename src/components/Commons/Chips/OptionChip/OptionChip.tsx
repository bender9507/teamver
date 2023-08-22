import type { InputHTMLAttributes, PropsWithChildren } from "react";
import * as Styled from "./OptionChip.styles";
import type { SelectChipProps } from "./OptionChip.types";

export const OptionChip = ({
  children,
  ...props
}: PropsWithChildren<SelectChipProps> & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Styled.Container>
      <Styled.Input type="checkbox" hidden {...props} />

      <Styled.Chip>{children}</Styled.Chip>
    </Styled.Container>
  );
};
