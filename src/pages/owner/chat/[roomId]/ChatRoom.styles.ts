import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const ChatRoomWrapper = styled.div`
  position: relative;

  ${flex.column()}
`;

export const ChatRoomTopBar = styled.section`
  ${flex({ align: "center", justify: "between" })}

  height: 55px;
`;

export const ChatMessageWrapper = styled.div`
  ${flex.column({ gap: 10 })}
`;

export const ChatFromWrapper = styled.form`
  position: absolute;

  bottom: 0;

  ${flex.center()}

  width: 100%;
`;

export const ChatMessageRight = styled.div`
  ${({ theme: { colors } }) => css`
    ${flex({ align: "center", justify: "end", gap: 16 })}

    color: ${colors.white};
  `}
`;

export const ChatMessageLeft = styled.div`
  ${({ theme: { colors } }) => css`
    text-align: left;

    color: ${colors.white};
  `}
`;
