import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexCenter, text } from "~/styles/mixins";

export const OpponentBubble = styled.div`
  padding: 12px 16px;

  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.backgroundSecondary};
    border-radius: 16px;

    ${text("textMedium")};
    color: ${colors.content1};
  `}
`;

export const MyBubble = styled.div`
  padding: 12px 16px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundSecondary};

    border-radius: 16px;

    ${text("textMedium")};
    color: ${colors.content1};
  `}
`;

export const NoticeBubble = styled(FlexCenter)`
  padding-top: 20px;

  ${({ theme: { colors } }) => css`
    ${text("textMedium")}
    color: ${colors.gray9};
  `}
`;
