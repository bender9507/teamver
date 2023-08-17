import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { ButtonStyleProps } from "./Button.types";

const primaryStyle = ({ theme: { palettes, shadows, colors } }: WithTheme<ButtonStyleProps>) => {
  const { base, hover, pressed } = palettes.blue;

  return css`
    background-color: ${base};
    ${selector("backgroundColor", { hover, active: pressed })}

    box-shadow: ${shadows.drop2};

    color: ${colors.white};
  `;
};

const secondaryStyle = ({ theme: { colors, shadows } }: WithTheme<ButtonStyleProps>) => css`
  background-color: ${colors.backgroundPrimary};
  ${selector("backgroundColor", { hover: colors.backgroundSecondary })}

  border: 1px solid ${colors.border};

  box-shadow: ${shadows.drop1};

  color: ${colors.content1};
`;

const borderlessStyle = ({ theme: { palettes } }: WithTheme<ButtonStyleProps>) => {
  const { base, pressed, background } = palettes.blue;

  return css`
    ${selector("backgroundColor", {
      hover: background,
      active: "transparent"
    })};

    color: ${base};
    ${selector("color", { active: pressed })}
  `;
};

const variantStyle = (props: WithTheme<ButtonStyleProps>) => {
  switch (props.variant) {
    case "secondary":
      return secondaryStyle(props);

    case "borderless":
      return borderlessStyle(props);

    default:
      return primaryStyle(props);
  }
};

const shapeStyle = ({
  shape,
  size: _size = "medium",
  theme: { sizes }
}: WithTheme<ButtonStyleProps>) => {
  switch (shape) {
    case "circle":
      return css`
        ${size({ width: sizes.height[_size], height: sizes.height[_size] })};

        border-radius: 50%;
      `;

    default:
      return css`
        height: ${sizes.height[_size]}px;

        padding: 0 ${sizes.padding[_size]}px;

        border-radius: 8px;
      `;
  }
};

export const Button = styled.button<ButtonStyleProps>`
  ${(props) => variantStyle(props)}
  ${(props) => shapeStyle(props)}

  ${({ theme: { sizes }, size = "medium" }) => css`
    ${flex.center()}

    ${text(sizes.heading[size])};

    ${selector("opacity", { disabled: 0.5 })};
  `}
`;
