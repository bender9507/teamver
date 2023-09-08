import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, text } from "~/styles/mixins";
import type { OptionProps } from "./setting.types";

export const Option = styled.button<OptionProps>`
  width: 100%;

  padding: 16px 22px;

  ${({ theme: { colors }, hasBorder }) => css`
    ${hasBorder &&
    `
      border-bottom: 2px solid ${colors.gray2};
    `}

    ${text("textLarge")};
    color: ${colors.content1};
    text-align: start;
  `}
`;

export const LanguageContainer = styled.div`
  ${flex.column({ gap: 26 })};

  padding: 25px 31px 38px 31px;
`;
