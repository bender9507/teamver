import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import type { ColorsKey } from "~/styles/theme";
import { styleHelper } from "~/styles/utils";
import { fontSize, fontWeight, lineHeight } from "./text.constants";
import type { FontSizeKey } from "./text.types";

export const text = (size: FontSizeKey) => css`
  font-size: ${fontSize[size]}px;
  font-weight: ${fontWeight[size]};
  line-height: ${lineHeight[size]}px;
`;

export const ellipsis = () => css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const lineClamp = (line: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Text = styled.span<{
  size?: FontSizeKey;
  color?: ColorsKey;
  ellipsis?: boolean;
  lineClamp?: number;
  textAlign?: CSSProperties["textAlign"];
  whiteSpace?: CSSProperties["whiteSpace"];
}>`
  ${({ size = "paragraph2" }) => text(size)}

  ${({
    theme,
    color = "content1",
    ellipsis: _ellipsis,
    lineClamp: _lineClamp,
    whiteSpace,
    textAlign
  }) => css`
    color: ${theme.colors[color]};

    ${_ellipsis && ellipsis()}
    ${_lineClamp && lineClamp(_lineClamp)}
    ${whiteSpace && styleHelper("whiteSpace", whiteSpace)}
    ${textAlign && styleHelper("textAlign", textAlign)}
  `};
`;
