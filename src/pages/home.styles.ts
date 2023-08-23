import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Container = styled.div`
  ${flex.center({ direction: "column", gap: 22 })};

  ${size({ fullScreen: true })};
`;
