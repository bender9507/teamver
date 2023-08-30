import type { FormEvent, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import * as Styled from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & InputHTMLAttributes<HTMLInputElement>
>(({ onInvalid, ...props }, ref) => {
  const handleOnInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (onInvalid) onInvalid(event);
  };

  return (
    <Styled.Input
      ref={ref}
      {...props}
      onInvalid={handleOnInvalid}
      onBlur={(event) => event.target.scrollIntoView()}
    />
  );
});
