import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const ChatRoomTopBar = styled.section`
  ${flex({ align: "center", justify: "between" })}

  height: 55px;
`;

export const ChatMessageWrapper = styled.div`
  ${flex.column()}
`;

export const ChatFromWrapper = styled.form`
  position: fixed;

  bottom: 0;

  ${flex.center()}

  width: 100%;
`;

export const ChatMessageRight = styled.p`
  ${({ theme: { colors } }) => css`
    text-align: right;

    color: ${colors.white};
  `}
`;

export const ChatMessageLeft = styled.p`
  ${({ theme: { colors } }) => css`
    text-align: left;

    color: ${colors.white};
  `}
`;
