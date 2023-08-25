import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const ChatRoomsTitleBox = styled.div`
  ${flex({ justify: "between", align: "center" })}

  width: 100%;

  padding: 15px 20px;
`;

export const ChatRoomsWrapper = styled.ul`
  ${flex.column({ gap: 16 })}
`;

export const ChatRoomBox = styled.li`
  ${({ theme: { colors } }) => css`
    ${flex({ gap: 16 })}

    padding-left: 20px;

    cursor: pointer;
    &:hover {
      background-color: ${colors.gray5};
    }
  `}
`;
