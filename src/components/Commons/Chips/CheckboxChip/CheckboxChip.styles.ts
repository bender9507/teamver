import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { text } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const chipStyle = ({ theme: { colors } }: WithTheme) => css`
  display: inline-block;

  padding: 10px 16px;

  background-color: ${colors.backgroundSecondary};

  box-sizing: content-box;

  border-radius: 30px;

  ${text("paragraph3")};
  color: ${colors.white};

  cursor: pointer;
`;

export const Chip = styled.span`
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
