import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, Flex, text } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";

export const MessageContainer = styled.div<{ isMine: boolean }>`
  ${flex({ gap: 6 })};

  ${({ isMine }) =>
    isMine &&
    css`
      ${styleHelper("alignSelf", "flex-end")};
      ${styleHelper("flexDirection", "row-reverse")}
    `}
`;

export const MessageBox = styled(Flex)<{ isMine: boolean }>`
  ${flex({ align: "end", gap: 11 })}

  ${({ isMine }) =>
    isMine &&
    css`
      ${styleHelper("flexDirection", "row-reverse")}
    `}
`;

export const Bubble = styled.div<{ isMine: boolean }>`
  padding: 12px 16px;

  ${({ theme: { colors }, isMine }) => css`
    border: 1px solid ${colors.backgroundSecondary};
    border-radius: 16px;

    ${text("textMedium")};
    color: ${colors.content1};

    ${isMine &&
    css`
      background-color: ${colors.backgroundSecondary};

      border: none;
    `}
  `}
`;
