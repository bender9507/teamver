import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { text } from "~/styles/mixins";
import { colors } from "~/styles/theme/colors";
import { hexToRgba } from "~/styles/utils";

export const BlurChip = styled.span`
  padding: 10px 16px;

  ${({ theme: { colors } }) => css`
    background-color: ${hexToRgba(colors.gray3, 0.3)};
    backdrop-filter: blur(5px);
  `};

  border-radius: 30px;

  ${text("paragraph3")};
  color: ${colors.content1};
`;

export const AdressBox = styled.div`
  padding: 10px 16px;

  border-radius: 30px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundPrimary};
  `}
`;
