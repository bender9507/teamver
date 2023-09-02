import styled from "@emotion/styled";
import { FlexColumn, flex } from "../flex";

export const CommonContainer = styled.div`
  ${flex.column()}

  padding: 32px 22px 78px 22px;
`;

export const Layout = styled.div`
  min-height: 100svh;
  max-height: 100svh;
`;

export const LayoutHeaderWithNav = styled(Layout)`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const LayoutHeader = styled(Layout)`
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const LayoutNav = styled(Layout)`
  display: grid;
  grid-template-rows: 1fr auto;
`;

export const LayoutContent = styled(FlexColumn)`
  overflow: scroll;
`;
