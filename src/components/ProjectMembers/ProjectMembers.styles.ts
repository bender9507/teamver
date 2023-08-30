import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex, grid, size } from "~/styles/mixins";

export const Header = styled.header`
  ${grid({ column: 3, justify: "start", align: "center" })};
  ${size({ width: "100%" })}

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const MembersContainer = styled(FlexColumn)`
  ${flex.column({ gap: 12, align: "start" })};
  ${size({ width: "100%", minHeight: "100vh" })};
  margin: 0 auto;
  padding: 48px 22px 0;
`;

export const MemberCard = styled.div`
  ${flex({ justify: "between", align: "center" })}
  ${size({ width: "100%" })}
`;
