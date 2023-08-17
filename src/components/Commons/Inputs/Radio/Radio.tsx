import { type InputHTMLAttributes } from "react";
import { useRadioGroup } from "../RadioGroup";
import * as Styled from "./Radio.styles";

export const Radio = (props: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) => {
  const radioGroupProps = useRadioGroup();

  return <Styled.Radio type="radio" {...radioGroupProps} {...props} />;
};
