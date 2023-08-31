import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex, grid, size } from "~/styles/mixins";

export const Container = styled(FlexColumn)`
  ${({
    theme: {
      sizes: { height }
    }
  }) => {
    const _height = `calc(100vh - ${height.navbar}px)`;

    return css`
      ${size({ width: "100%", height: _height })}
    `;
  }}
  padding: 20px;
`;

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
