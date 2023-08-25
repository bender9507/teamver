import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { WithTheme } from "~/types";
import type { ChipProps } from "./Chip.types";

const containerStyle = ({
  theme: { colors },
  bgColor = "backgroundSecondary",
  color = "white"
}: WithTheme<ChipProps>) => css`
  display: inline-flex;

  padding: 4px 8px;

  background-color: ${colors[bgColor]};

  border-radius: 6px;

  color: ${colors[color]};
`;

export const Container = styled.span<ChipProps>`
  ${(props) => containerStyle(props)}
`;
