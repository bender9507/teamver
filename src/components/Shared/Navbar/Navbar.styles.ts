import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, position, size, text } from "~/styles/mixins";

export const Navbar = styled.nav`
  ${position.sticky({ bottom: 0 })};

  ${flex({ align: "start", justify: "around" })};

  padding-top: 12px;

  ${({ theme: { colors, sizes } }) => css`
    background-color: ${colors.backgroundPrimary};

    ${size({ height: sizes.height.navbar })};
  `};
`;

export const UnreadCount = styled.span`
  ${position.absolute({ right: 0, top: 0 })}

  padding: 2px 6px;

  border-radius: 10px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.success};

    ${text("textTiny")};
    color: ${colors.content1};
  `}

  transform: translate(50%, -30%);
`;
