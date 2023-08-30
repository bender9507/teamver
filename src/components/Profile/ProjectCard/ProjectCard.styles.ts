import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const Container = styled.div`
  ${flex({ gap: 8 })};
`;

export const Content = styled.div`
  ${flex.column({ justify: "between" })};
  flex: 1;

  overflow: hidden;
`;
