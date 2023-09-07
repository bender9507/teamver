import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, position, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { ProgressStyleProps } from "./welcome.types";

export const Header = styled.header`
  ${flex.column({ gap: 23 })};

  padding: 10px 21px 27px 21px;
`;

export const progressStyle = ({
  theme: { colors },
  current,
  max
}: WithTheme<ProgressStyleProps>) => {
  const percent = (current / max) * 100;

  return css`
    position: relative;
    overflow: hidden;

    ${size({ width: "100%", height: "5px" })};

    background-color: ${colors.gray5};

    border-radius: 8px;

    &::after {
      content: "";
      ${position.absolute({ top: 0, left: 0 })};

      ${size({ width: "100%", height: "100%" })};

      background-color: ${colors.primary};

      transition: 300ms;
      transform: scaleX(${percent}%);
      transform-origin: left;
    }
  `;
};

export const Progress = styled.div<ProgressStyleProps>`
  ${(props) => progressStyle(props)};
`;
