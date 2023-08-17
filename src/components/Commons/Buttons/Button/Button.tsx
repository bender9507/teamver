import { forwardRef } from "react";
import * as Styled from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <Styled.Button ref={ref} {...props} />;
});
