import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fade, slideY } from "~/styles/animation";
import { flex, position, size, text } from "~/styles/mixins";
import { hexToRgba } from "~/styles/utils";

export const Outer = styled.div`
  ${position.absolute({ top: 0, left: 0 })};

  ${flex({ justify: "center", align: "center" })};

  ${size({ fullScreen: true })};

  ${({ theme: { colors, zIndex } }) => css`
    z-index: ${zIndex.dialog};

    background-color: ${hexToRgba(colors.black, 0.54)};
  `}

  animation: ${fade(0)} 400ms;
`;

export const Inner = styled.div`
  ${flex.center({ direction: "column" })};

  ${size({ width: 270 })};

  ${({ theme: { colors, shadows } }) => css`
    background-color: ${colors.gray3};
    box-shadow: ${shadows.drop3};

    border-radius: 14px;
    border: 1px solid ${colors.gray3};
  `};

  animation: ${slideY(20)} 400ms;
`;

export const Button = styled.button`
  ${text("heading5")};

  ${({ theme: { colors } }) => css`
    color: ${colors.white};
  `}
`;

export const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${size({ width: "100%", height: 44 })};

  ${({ theme: { colors } }) => css`
    border-top: 1px solid ${colors.black};

    ${Button} + ${Button} {
      border-left: 1px solid ${colors.black};
    }
  `}
`;

export const Content = styled.div`
  ${flex.center({ direction: "column", gap: 8 })};

  width: 100%;

  padding: 24px 18px;
`;
