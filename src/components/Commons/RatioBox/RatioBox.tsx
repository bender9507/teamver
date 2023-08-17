import type { PropsWithChildren } from "react";
import type { WithAs } from "~/types";
import * as Styled from "./RatioBox.styles";
import type { RatioBoxProps } from "./RatioBox.types";

export const RatioBox = ({ children, ...props }: PropsWithChildren & WithAs<RatioBoxProps>) => {
  return <Styled.Container {...props}>{children}</Styled.Container>;
};
