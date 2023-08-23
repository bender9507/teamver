import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { styleHelper } from "~/styles/utils";
import { getObjectEntries } from "~/utils";
import type { SizeProps } from "./size.types";

export const size = ({ fullScreen, ...props }: SizeProps) => css`
  ${getObjectEntries(props).map(([key, value]) => styleHelper(key, value))}

  ${fullScreen &&
  css`
    width: 100%;
    height: 100vh;

    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
  `}
`;

const circle = (size: number) => css`
  ${styleHelper("width", size)};
  ${styleHelper("height", size)};

  border-radius: 100%;
`;

size.circle = circle;

export const SizeBox = styled.div<SizeProps>`
  ${(props) => size(props)}
`;
