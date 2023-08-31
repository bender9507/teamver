import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size, text } from "~/styles/mixins";
import { Icon } from "../../Icon";

export const Radio = styled.input`
  display: none;
`;

export const RadioIcon = styled(Icon)`
  display: inline-block;

  ${size({ width: 24, height: 24 })};

  ${({ theme: { colors } }) => css`
    color: ${colors.gray9};
  `}
`;

export const Label = styled.label`
  ${flex({ gap: 8, align: "center" })};

  ${({ theme: { colors } }) => css`
    ${text("textLarge")};
    color: ${colors.content1};

    ${Radio}:checked + ${RadioIcon} {
      color: ${colors.success};
    }
  `};

  cursor: pointer;
`;
