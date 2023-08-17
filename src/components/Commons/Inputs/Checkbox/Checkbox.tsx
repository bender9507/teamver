import type { InputHTMLAttributes } from "react";
import * as Styled from "./Checkbox.styles";

export const Checkbox = (props: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) => {
  return <Styled.Checkbox type="checkbox" {...props} defaultChecked />;
};
