import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";

export const buttonStyle = ({ theme: { sizes, colors } }: WithTheme) => css`
  ${size({ height: sizes.height.large })}

  background-color: ${colors.secondary};

  border-radius: 30px;

  ${text("paragraph2")};

  ${selector("backgroundColor", { disabled: colors.gray5 })};
`;

export const Button = styled.button`
  ${(props) => buttonStyle(props)};
`;
