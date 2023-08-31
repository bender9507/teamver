import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { SelectChipProps } from "./SelectChip.types";

const chipStyle = ({
  theme: { colors, sizes },
  color = "backgroundSecondary",
  size: _size = "small"
}: WithTheme<SelectChipProps>) => css`
  ${flex.center()};

  ${size({ height: sizes.height[_size] })};

  padding: 0 16px;

  background-color: ${colors[color]};

  box-sizing: content-box;

  border-radius: 30px;

  ${text("textSmallBold")};
  color: ${colors.white};

  cursor: pointer;
`;

export const Chip = styled.span<SelectChipProps>`
  ${(props) => chipStyle(props)}
`;

export const Container = styled.label`
  position: relative;
`;

const checkedStyle = ({ theme: { colors } }: WithTheme) => css`
  box-shadow: inset 0 0 0 1px ${colors.primary};
`;

export const Input = styled.input`
  &:checked + ${Chip} {
    ${(props) => checkedStyle(props)}
  }
`;
