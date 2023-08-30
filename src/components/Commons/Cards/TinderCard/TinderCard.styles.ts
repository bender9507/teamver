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

    border-radius: 24px;

    background-color: ${colors.backgroundSecondary};

    transform: translate(${translatePos.x}px, ${translatePos.y}px) rotate(${rotate}deg);
    ${transition && styleHelper("transition", `${transition}ms`)};

    ${!event && styleHelper("pointerEvents", "none")};

    * {
      user-select: none;
      -webkit-user-drag: none;
    }
  `;
};

export const Container = styled.div<TinderCardAnimation>`
  ${(props) => containerStyle(props)}
`;

export const SelectBox = styled.div`
  ${flex({ justify: "around", align: "center" })};

  ${size({ width: "100%", height: 74 })}

  background-image: linear-gradient(
    180deg,
    rgba(34, 34, 34, 0.04) 60%,
    rgba(222, 255, 0, 0.04) 100%
  );
`;

export const Card = styled.div`
  position: relative;
  overflow: hidden;

  ${flex({ align: "end" })};

  ${size({ width: "100%", height: "100%" })};
`;
