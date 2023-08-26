import {
  forwardRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type PropsWithChildren
} from "react";
import { Chip } from "..";
import * as Styled from "./CheckboxChip.styles";
import type { CheckboxChipProps } from "./CheckboxChip.types";

export const CheckboxChip = forwardRef<
  HTMLInputElement,
  PropsWithChildren<CheckboxChipProps> & InputHTMLAttributes<HTMLInputElement>
>(({ children, onChange, chipProps, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(false);

  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);

    if (onChange) onChange(event);
  };

  return (
    <Styled.Container>
      <Styled.Input ref={ref} type="checkbox" hidden onChange={_onChange} {...props} />

      <Chip isSelected={isChecked} {...chipProps}>
        {children}
      </Chip>
    </Styled.Container>
  );
});
