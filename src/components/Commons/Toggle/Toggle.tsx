import type { ChangeEvent } from "react";
import { useBoolean } from "~/hooks";
import * as Styled from "./Toggle.styles";
import type { ToggleProps } from "./Toggle.types";

export const Toggle = ({ onChange, bgColor, icons, ...props }: ToggleProps) => {
  const [isChecked, setIsChecked] = useBoolean(props.checked);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);

    setIsChecked.toggle();
  };

  return (
    <Styled.Container isChecked={isChecked} bgColor={bgColor}>
      <Styled.Ball isChecked={isChecked}>
        {icons && (isChecked ? icons.checked : icons.unchecked)}
      </Styled.Ball>

      <input type="checkbox" onChange={handleOnChange} hidden />
    </Styled.Container>
  );
};
