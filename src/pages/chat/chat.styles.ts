import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex } from "~/styles/mixins";

export const Header = styled.header`
  ${flex.center()};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const Container = styled(FlexColumn)`
  padding: 49px 22px;
`;

export const ChatRoomsWrapper = styled.ul`
  ${flex.column({ gap: 12 })}
`;

export const ChatRoomBox = styled.li`
  ${({ theme: { colors } }) => css`
    ${flex({ gap: 8 })}

    cursor: pointer;
    &:hover {
      background-color: ${colors.gray5};
    }
  `}
`;
