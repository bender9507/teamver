import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex } from "~/styles/mixins";

export const Header = styled.header`
  ${flex.center()};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const ChatListWrapper = styled.div`
  height: calc(100vh - 60px);
`;

export const Container = styled(FlexColumn)`
  padding: 0 22px;
`;

export const ChatRoomsWrapper = styled.ul`
  ${flex.column({ gap: 12 })}

  overflow: scroll;
`;

export const ChatRoomBox = styled.li`
  ${flex({ gap: 8 })}

  ${({ theme: { colors } }) => css`
    cursor: pointer;
    &:hover {
      background-color: ${colors.gray5};
    }
  `}
`;
