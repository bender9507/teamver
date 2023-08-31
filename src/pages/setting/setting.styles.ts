import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, text } from "~/styles/mixins";

export const Option = styled.button`
  padding: 16px 22px;

  ${({ theme: { colors } }) => css`
    & + & {
      border-top: 2px solid ${colors.gray2};
    }

    ${text("textLarge")};
    color: ${colors.content1};
    text-align: start;
  `}
`;

export const LanguageContainer = styled.div`
  ${flex.column({ gap: 26 })};

  padding: 25px 31px 38px 31px;
`;
