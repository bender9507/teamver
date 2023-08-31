import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: "100%", maxWidth: "500px", minHeight: "100svh" })};

  margin: 0 auto;
`;
