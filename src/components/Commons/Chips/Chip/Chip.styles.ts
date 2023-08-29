import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size, text } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";
import type { WithTheme } from "~/types";
import type { ChipProps } from "./Chip.types";

const containerStyle = ({
  theme: { colors, sizes },
  isSelected,
  color = "backgroundSecondary",
  size: _size = "small"
}: WithTheme<ChipProps>) => css`
  ${flex.center()};

  ${size({ height: sizes.height[_size] })}

  padding: 0 16px;

  background-color: ${colors[color]};

  ${isSelected && styleHelper("boxShadow", `inset 0 0 0 1px ${colors.primary}`)};

  border-radius: 30px;

  ${text("paragraph3")};
  color: ${colors.white};
  white-space: nowrap;
`;

export const Container = styled.span<ChipProps>`
  ${(props) => containerStyle(props)}
`;
