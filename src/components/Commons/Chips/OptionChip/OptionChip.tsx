import type { InputHTMLAttributes, PropsWithChildren } from "react";
import * as Styled from "./OptionChip.styles";

export const OptionChip = ({
  children,
  ...props
}: PropsWithChildren & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Styled.Container>
      <Styled.Input type="checkbox" hidden {...props} />

      <Styled.Chip>{children}</Styled.Chip>
    </Styled.Container>
  );
};
