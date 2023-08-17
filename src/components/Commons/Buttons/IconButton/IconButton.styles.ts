import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { size } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";
import type { IconButtonStyleProps } from "./IconButton.types";

export const Container = styled.button<IconButtonStyleProps>`
  display: inline-block;

  ${({ theme: { colors }, color, width = 24, height = 24 }) => css`
    ${size({ width, height })}

    ${color && styleHelper("color", colors[color])}
  `}
`;
