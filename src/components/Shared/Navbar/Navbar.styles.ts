import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { scale } from "~/styles/animation";
import { flex, position, size, text } from "~/styles/mixins";

export const Navbar = styled.nav`
  ${position.sticky({ bottom: 0 })};

  ${flex({ align: "center", justify: "around" })};

  padding-bottom: 20px;

  ${({ theme: { sizes, colors } }) => css`
    ${size({ height: sizes.height.navbar })}

    background-color: ${colors.backgroundPrimary};
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

  animation: ${scale(0)} 300ms;
`;
