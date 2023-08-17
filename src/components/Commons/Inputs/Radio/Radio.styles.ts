import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const unCheckedStyle = ({ theme: { colors } }: WithTheme) => css`
  border: 1px solid ${colors.border};
`;

const checkedStyle = ({ theme: { colors } }: WithTheme) => css`
  ${flex.center()};

  background-color: ${colors.blue};

  &::after {
    content: "";
    ${size({ width: 8, height: 8 })};

    background-color: ${colors.white};

    border-radius: 4px;
  }
`;

const baseStyle = ({ theme: { colors, shadows } }: WithTheme) => css`
  position: relative;

  ${size({ width: 20, height: 20 })};

  background-color: ${colors.backgroundPrimary};
  box-shadow: ${shadows.drop2};

  border-radius: 10px;

  cursor: pointer;
`;

export const Radio = styled.input`
  ${(props) => baseStyle(props)}

  &:not(:checked) {
    ${(props) => unCheckedStyle(props)};
  }

  &:checked {
    ${(props) => checkedStyle(props)}
  }
`;
