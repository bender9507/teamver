import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fade, slideY, vibration } from "~/styles/animation";
import { flex, position, size } from "~/styles/mixins";
import { hexToRgba } from "~/styles/utils";

export const Outer = styled.div`
  ${position.fixed({ top: 0, left: 0 })};

  ${flex({ justify: "center", align: "center" })};

  ${size({ fullScreen: true })};

  ${({ theme: { colors } }) => css`
    background-color: ${hexToRgba(colors.black, 0.54)};
  `}
`;

export const Inner = styled.div<{ isVibration: boolean }>`
  ${flex.center({ direction: "column", gap: 16 })};

  ${size({ width: 360, height: "fit-content", maxWidth: "calc(100% - 40px)" })};

  padding: 16px;

  ${({ theme: { colors, shadows }, isVibration }) => css`
    background-color: ${colors.secondary};

    border-radius: 12px;
    border: 1px solid ${colors.gray2};

    box-shadow: ${shadows.drop3};

    ${isVibration
      ? css`
          animation: ${slideY(20)} 400ms, ${fade(0)} 400ms, ${vibration(1)} 100ms infinite;
        `
      : css`
          animation: ${slideY(20)} 400ms, ${fade(0)} 400ms;
        `}
  `};
`;
