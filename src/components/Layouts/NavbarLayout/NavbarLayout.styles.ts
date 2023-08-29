import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;

  ${size({ fullScreen: true })};
`;

export const Main = styled.main`
  overflow: scroll;
`;
