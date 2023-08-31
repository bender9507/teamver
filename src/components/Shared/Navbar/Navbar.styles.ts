import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, position, size } from "~/styles/mixins";

export const Navbar = styled.nav`
  ${position.sticky({ bottom: 0 })};

  ${flex({ align: "center", justify: "around" })};

  ${({ theme: { sizes, colors } }) => css`
    ${size({ height: sizes.height.navbar })}

    background-color: ${colors.backgroundPrimary};
  `};
`;

export const UnreadDot = styled.span``;
