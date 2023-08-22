import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.column({ gap: 15 })};

  border: 1px solid black;
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
`;
