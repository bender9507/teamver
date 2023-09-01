import type { FormEvent, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { useBoolean } from "~/hooks";
import * as Styled from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & InputHTMLAttributes<HTMLInputElement>
>(({ onInvalid, rightElement, color, ...props }, ref) => {
  const [focus, setFocus] = useBoolean();

  const handleOnInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (onInvalid) onInvalid(event);
  };

  return (
    <Styled.Container color={color} focus={focus}>
      <Styled.Input
        ref={ref}
        {...props}
        onInvalid={handleOnInvalid}
        onFocus={setFocus.on}
        onBlur={setFocus.off}
      />

      {rightElement && rightElement}
    </Styled.Container>
  );
});
