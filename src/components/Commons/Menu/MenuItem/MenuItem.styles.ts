import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, selector, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const containerStyle = ({ theme: { colors } }: WithTheme) => css`
  ${flex({ align: "center" })}

  height: 32px;

  padding: 4px 8px;

  ${selector("backgroundColor", { hover: colors.backgroundSecondary })}

  border-radius: 8px;

  ${text("paragraph3")}
  color: ${colors.content2};
  white-space: nowrap;

  cursor: pointer;
`;

export const Container = styled.li`
  ${(props) => containerStyle(props)}
`;
