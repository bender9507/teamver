import { forwardRef, type PropsWithChildren } from "react";
import * as Styled from "./Animation.styles";
import type { AnimationProps } from "./Animation.types";

export const Animation = forwardRef<HTMLDivElement, PropsWithChildren<AnimationProps>>(
  (props, ref) => {
    return <Styled.Container ref={ref} key={props.mode} {...props} />;
  }
);
