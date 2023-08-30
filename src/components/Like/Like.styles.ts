import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, grid, size } from "~/styles/mixins";

export const Header = styled.header`
  ${grid({ column: 3, justify: "start", align: "center" })};
  ${size({ width: "100%" })}

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const Card = styled.div`
  ${flex({ align: "center", justify: "between" })}
`;
