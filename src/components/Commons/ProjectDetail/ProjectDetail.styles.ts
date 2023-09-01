import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { position, text } from "~/styles/mixins";
import { colors } from "~/styles/theme/colors";
import { hexToRgba } from "~/styles/utils";

export const Container = styled.div`
  padding: 36px 22px;
`;

export const BlurChip = styled.span`
  ${position.absolute({ bottom: 24, right: 34 })};

  padding: 10px 16px;

  ${({ theme: { colors } }) => css`
    background-color: ${hexToRgba(colors.gray3, 0.3)};
    backdrop-filter: blur(5px);
  `};

  border-radius: 30px;

  ${text("paragraph3")};
  color: ${colors.content1};
`;
