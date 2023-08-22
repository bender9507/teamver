import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { WithTheme } from "~/types";
import type { SelectChipProps } from "./OptionChip.types";

const chipStyle = ({ theme: { colors } }: WithTheme) => css`
  display: inline-block;

  padding: 4px 8px;

  background-color: ${colors.backgroundSecondary};

  border-radius: 6px;

  color: ${colors.black};

  cursor: pointer;
`;

export const Chip = styled.span`
  ${(props) => chipStyle(props)}
`;

export const Container = styled.label`
  position: relative;
`;

const checkedStyle = ({
  theme: { colors },
  bgColor = "info",
  color = "white"
}: WithTheme<SelectChipProps>) => css`
  background-color: ${colors[bgColor]};

  color: ${colors[color]};
`;

export const Input = styled.input<SelectChipProps>`
  &:checked + ${Chip} {
    ${(props) => checkedStyle(props)}
  }
`;
