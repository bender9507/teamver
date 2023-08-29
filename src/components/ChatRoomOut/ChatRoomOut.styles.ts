import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const ChatRoomOutWrapper = styled.div`
  ${flex.center({ direction: "column", gap: 30 })}

  padding: 82px 0;
`;

export const ChatRoomOutText = styled.span`
  ${({ theme: { colors } }) => css`
    color: ${colors.white};

    cursor: pointer;
  `}
`;
