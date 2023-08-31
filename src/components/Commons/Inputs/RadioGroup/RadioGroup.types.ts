import type { InputHTMLAttributes } from "react";
import type { FlexProps } from "~/styles/mixins";

export interface RadioGroupProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, "name" | "onChange"> {
  defaultChecked?: string;
  containerProps?: FlexProps;
}
