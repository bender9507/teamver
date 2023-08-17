import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fade, slideY } from "~/styles/animation";
import { flex, position, size } from "~/styles/mixins";
import { hexToRgba } from "~/styles/utils";
import type { ModalStyleProps } from "./Modal.types";

export const Outer = styled.div`
  ${position.fixed({ top: 0, left: 0 })};

  ${flex.center()}

  ${size({ fullScreen: true })};

  ${({ theme: { colors, zIndex } }) => css`
    background-color: ${hexToRgba(colors.content1, 0.5)};

    z-index: ${zIndex.modal};
  `};

  backdrop-filter: blur(8px);

  animation: ${fade(0)} 300ms;
`;

export const Inner = styled.div<ModalStyleProps>`
  ${({ theme: { colors, shadows }, width = 600 }) => css`
    ${size({ width, maxWidth: "95%", maxHeight: "90%" })}

    padding: 16px;

    border-radius: 16px;

    background-color: ${colors.backgroundPrimary};
    box-shadow: ${shadows.drop3};

    animation: ${slideY(20)} 300ms;
  `};
`;
