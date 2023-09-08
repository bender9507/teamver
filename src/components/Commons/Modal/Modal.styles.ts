import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fade, slideY } from "~/styles/animation";
import { flex, position, size } from "~/styles/mixins";
import { hexToRgba } from "~/styles/utils";
import type { WithTheme } from "~/types";
import type { ModalStyleProps } from "./Modal.types";

const outerBackgroundStyle = ({ theme: { colors } }: WithTheme<ModalStyleProps>) => {
  return css`
    background-color: ${hexToRgba(colors.black, 0.4)};
    backdrop-filter: blur(8px);
  `;
};

export const Outer = styled.div<ModalStyleProps>`
  ${(props) => outerBackgroundStyle(props)}

  ${flex.center()};

  ${position.absolute({ top: 0, left: 0 })};

  ${size({ width: "100%", height: "100%" })};

  ${({ theme }) => css`
    z-index: ${theme.zIndex.modal};
  `}

  animation: ${fade(0)} 400ms;

  -webkit-overflow-scrolling: touch;
`;

const innerStyle = ({ theme: { colors } }: WithTheme<ModalStyleProps>) => {
  return css`
    ${size({ width: 270, maxHeight: "80%" })};

    background-color: ${colors.backgroundSecondary};

    border-radius: 16px;

    animation: ${slideY(20)} 400ms;
  `;
};

export const Inner = styled.div<ModalStyleProps>`
  ${(props) => innerStyle(props)}

  position: relative;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;
