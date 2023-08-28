import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, Text, grid, size } from "~/styles/mixins";

export const Container = styled(FlexColumn)`
  ${size({ width: "100%", minHeight: "100vh" })};
  margin: 0 auto;
  padding: 15px;
`;

export const Header = styled.div`
  ${grid({ column: 3, justify: "start", align: "center" })};
  ${size({ width: "100%" })}

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const Desc = styled(Text)`
  ${({ theme: { colors } }) => css`
    color: ${colors.gray3};
  `}
  margin-left: 20px;
`;
