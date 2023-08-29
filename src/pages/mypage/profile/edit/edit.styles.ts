import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text, flex, grid, size } from "~/styles/mixins";

export const Container = styled.form`
  ${flex.column({ gap: 30, align: "center" })};
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

export const ProfileItem = styled.div`
  ${flex.column({ gap: 10 })}
  ${size({ width: "100%" })}
`;

export const ChipsContainer = styled.div`
  ${flex({ gap: 10, wrap: "wrap" })}
`;

export const Desc = styled(Text)`
  ${({ theme: { colors } }) => css`
    color: ${colors.gray3};
  `}
  margin-left: 20px;
`;
