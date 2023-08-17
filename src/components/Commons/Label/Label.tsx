import type { LabelHTMLAttributes } from "react";
import type { PropsWithElement } from "~/types";
import * as Styled from "./Label.styles";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
  desc?: string;
  required?: boolean;
  direction?: "column" | "row";
  full?: boolean;
}

export const Label = ({
  children,
  title,
  desc,
  required,
  direction,
  ...props
}: PropsWithElement<LabelProps>) => {
  return (
    <Styled.Label direction={direction} {...props}>
      {title && <Styled.Title required={required}>{title}</Styled.Title>}

      {children}

      {desc && (
        <Styled.Desc color="content3" size="paragraph3">
          {desc}
        </Styled.Desc>
      )}
    </Styled.Label>
  );
};
