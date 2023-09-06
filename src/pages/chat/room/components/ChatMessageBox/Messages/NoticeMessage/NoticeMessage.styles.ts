import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexCenter, text } from "~/styles/mixins";

export const Bubble = styled(FlexCenter)`
  padding-top: 20px;

  ${({ theme: { colors } }) => css`
    ${text("textMedium")}
    color: ${colors.gray9};
  `}
`;
