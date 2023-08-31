import type { InputHTMLAttributes, PropsWithChildren } from "react";
import { checkbox } from "~/assets/icons";
import { useRadioGroup } from "../RadioGroup";
import * as Styled from "./Radio.styles";

export const Radio = ({
  children,
  ...props
}: PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>) => {
  const { defaultChecked, ...radioGroupProps } = useRadioGroup();

  return (
    <Styled.Label>
      <Styled.Radio
        {...radioGroupProps}
        {...props}
        type="radio"
        defaultChecked={defaultChecked === props.value}
        style={{ backgroundImage: `url(${checkbox})` }}
      />

      <Styled.RadioIcon name="checkbox" />

      {children}
    </Styled.Label>
  );
};
