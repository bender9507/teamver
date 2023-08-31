import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fade, slideY } from "~/styles/animation";
import { flex, position, size } from "~/styles/mixins";
import { hexToRgba } from "~/styles/utils";
import type { WithTheme } from "~/types";
import type { ModalStyleProps } from "./Modal.types";

const outerTypeStyle = ({ type = "center" }: WithTheme<ModalStyleProps>) => {
  switch (type) {
    case "bottom":
      return css`
        ${flex({ align: "end" })}
      `;

    default:
      return css`
        ${flex.center()}
      `;
  }
};

const outerBackgroundStyle = ({ background, theme: { colors } }: WithTheme<ModalStyleProps>) => {
  switch (background) {
    case "clear":
      return css`
        background-color: ${hexToRgba(colors.black, 0.4)};
      `;
    case "none":
      return;
    default:
      return css`
        background-color: ${hexToRgba(colors.black, 0.4)};
        backdrop-filter: blur(8px);
      `;
  }
};

export const Outer = styled.div<ModalStyleProps>`
  ${(props) => outerTypeStyle(props)}
  ${(props) => outerBackgroundStyle(props)}

  ${position.absolute({ top: 0, left: 0 })};

  ${size({ width: "100%", height: "100%" })};

  ${({ theme }) => css`
    z-index: ${theme.zIndex.modal};
  `}

  animation: ${fade(0)} 400ms;
`;

const innerStyle = ({ type = "center", theme: { colors } }: WithTheme<ModalStyleProps>) => {
  switch (type) {
    case "bottom":
      return css`
        ${size({ width: "100%", maxHeight: "90%" })}

        background-color: ${colors.backgroundSecondary};

        border-radius: 16px 16px 0 0;

        animation: ${slideY(100)} 400ms;
      `;

    default:
      return css`
        ${size({ width: 400, maxWidth: "90%", maxHeight: "80%" })}

        background-color: ${colors.backgroundSecondary};

        border-radius: 16px;

        animation: ${slideY(20)} 400ms;
      `;
  }
};

export const Inner = styled.div<ModalStyleProps>`
  ${(props) => innerStyle(props)}

  position: relative;

  overflow-y: scroll;
`;
