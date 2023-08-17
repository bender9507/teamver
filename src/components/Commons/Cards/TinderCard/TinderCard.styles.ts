import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";
import type { WithTheme } from "~/types";
import type { TinderCardAnimation } from "./TinderCard.types";

const containerStyle = ({
  theme: { colors },
  transition,
  translatePos,
  rotate,
  opacity,
  event
}: WithTheme<TinderCardAnimation>) => {
  return css`
    ${flex.center()};
    opacity: ${opacity};

    ${size({ width: 300, height: 400 })};

    border: 1px solid black;

    background-color: ${colors.white};

    transform: translate(${translatePos.x}px, ${translatePos.y}px) rotate(${rotate}deg);
    ${transition && styleHelper("transition", `${transition}ms`)}

    ${!event && styleHelper("pointerEvents", "none")}
  `;
};

export const Container = styled.div<TinderCardAnimation>`
  ${(props) => containerStyle(props)}
`;
