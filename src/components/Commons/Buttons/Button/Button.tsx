import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import * as Styled from "./Button.styles";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return <Styled.Button ref={ref} {...props} />;
  }
);
