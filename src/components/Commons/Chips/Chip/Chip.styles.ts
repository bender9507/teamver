import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { text } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const containerStyle = ({ theme: { colors } }: WithTheme) => css`
  display: inline-flex;

  padding: 10px 16px;

  background-color: ${colors.backgroundSecondary};

  border-radius: 30px;

  ${text("paragraph3")};
  color: ${colors.white};
`;

export const Container = styled.span`
  ${(props) => containerStyle(props)}
`;
