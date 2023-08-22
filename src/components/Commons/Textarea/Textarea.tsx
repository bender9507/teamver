import type { FormEvent } from "react";
import { forwardRef } from "react";
import * as Styled from "./Textarea.styles";
import type { TextareaProps } from "./Textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size, onInvalid, ...props }, ref) => {
    const handleOnInvalid = (event: FormEvent<HTMLTextAreaElement>) => {
      event.preventDefault();

      if (onInvalid) onInvalid(event);
    };

    return <Styled.Input ref={ref} {...props} styleSize={size} onInvalid={handleOnInvalid} />;
  }
);
