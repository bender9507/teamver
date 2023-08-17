import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { keyframeCreator } from "~/styles/animation";
import type { AnimationProps } from "./Animation.types";

export const animationStyle = ({ delay = 500, start, end }: AnimationProps) => {
  const _keyframes = keyframeCreator(start, end);

  return css`
    animation: ${_keyframes} ${delay}ms;
    animation-fill-mode: forwards;
  `;
};

export const Container = styled.div<AnimationProps>`
  ${(props) => {
    switch (props.mode) {
      case "in":
        return animationStyle(props);

      case "out":
        return css`
          ${animationStyle(props)}
          animation-direction: reverse;
        `;

      default:
        return css`
          visibility: hidden;
        `;
    }
  }}
`;
