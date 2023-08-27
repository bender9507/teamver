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
    overflow: hidden;

    ${flex.center({ direction: "column" })};
    opacity: ${opacity};

    ${size({ width: "100%", height: "100%" })};

    border: 1px solid black;
    border-radius: 24px;

    background-color: ${colors.backgroundSecondary};

    transform: translate(${translatePos.x}px, ${translatePos.y}px) rotate(${rotate}deg);
    ${transition && styleHelper("transition", `${transition}ms`)}

    ${!event && styleHelper("pointerEvents", "none")}
  `;
};

export const Container = styled.div<TinderCardAnimation>`
  ${(props) => containerStyle(props)}
`;

export const SelectBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;

  ${size({ width: "100%", height: 68 })}

  background-image: linear-gradient(
    180deg,
    rgba(34, 34, 34, 0.04) 60%,
    rgba(222, 255, 0, 0.04) 100%
  );
`;

export const Card = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: "100%", height: "100%" })};
`;
