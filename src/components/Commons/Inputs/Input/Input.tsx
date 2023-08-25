import type { FormEvent, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import * as Styled from "./Input.styles";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ onInvalid, ...props }, ref) => {
    const handleOnInvalid = (event: FormEvent<HTMLInputElement>) => {
      event.preventDefault();

      if (onInvalid) onInvalid(event);
    };

    return <Styled.Input ref={ref} {...props} onInvalid={handleOnInvalid} />;
  }
);
