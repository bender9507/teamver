import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { ButtonProps } from "./Button.types";

export const buttonStyle = ({
  theme: { sizes, colors },
  size: _size = "large",
  color = "black",
  bgColor = "secondary"
}: WithTheme<ButtonProps>) => css`
  ${size({ height: sizes.height[_size] })}

  background-color: ${colors[bgColor]};
  ${selector("backgroundColor", { disabled: colors.gray5 })};

  border-radius: 30px;

  padding: 0 16px;

  ${text(sizes.paragraph[_size])};
  color: ${colors[color]};
`;

export const Button = styled.button<ButtonProps>`
  ${(props) => buttonStyle(props)};
`;
