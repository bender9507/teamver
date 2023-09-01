import styled from "@emotion/styled";
import { FlexColumn, flex } from "../flex";

export const CommonContainer = styled.div`
  ${flex.column()}

  padding: 32px 22px 78px 22px;
`;

export const LayoutHeaderWithNav = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;

  min-height: 100svh;
  max-height: 100svh;
`;

export const LayoutHeader = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;

  min-height: 100svh;
  max-height: 100svh;
`;

export const LayoutNav = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;

  min-height: 100svh;
  max-height: 100svh;
`;

export const LayoutContent = styled(FlexColumn)`
  position: relative;

  overflow: scroll;
`;
