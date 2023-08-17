import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { position, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const unCheckedStyle = ({ theme }: WithTheme) => css`
  border: 1px solid ${theme.colors.border};
`;

const checkMarkBaseStyle = ({ colors }: Theme) => css`
  ${position.absolute({ left: 0, bottom: 5 })}

  background-color: ${colors.white};

  border-radius: 3px;

  transform: translateX(8px) rotate(-45deg);
  transform-origin: left bottom;
`;

const checkedStyle = ({ theme }: WithTheme) => css`
  background-color: ${theme.colors.blue};

  &::before {
    content: "";
    ${checkMarkBaseStyle(theme)}

    ${size({ width: 2.5, height: 6 })}
  }

  &::after {
    content: "";
    ${checkMarkBaseStyle(theme)}

    ${size({ width: 10, height: 2.5 })}
  }
`;

const baseStyle = ({ theme: { colors, shadows } }: WithTheme) => css`
  position: relative;

  ${size({ width: 20, height: 20 })};

  background-color: ${colors.backgroundPrimary};
  box-shadow: ${shadows.drop2};

  border-radius: 4px;

  cursor: pointer;
`;

export const Checkbox = styled.input`
  ${(props) => baseStyle(props)}

  &:not(:checked) {
    ${(props) => unCheckedStyle(props)};
  }

  &:checked {
    ${(props) => checkedStyle(props)}
  }
`;
