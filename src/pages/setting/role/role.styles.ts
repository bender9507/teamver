import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { text } from "~/styles/mixins";

export const Option = styled.button`
  padding: 16px 22px;

  ${({ theme: { colors } }) => css`
    ${text("textLarge")};

    color: ${colors.content1};

    text-align: start;
  `}
`;
