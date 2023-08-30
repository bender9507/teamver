import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;

  ${size({ width: "100%", maxWidth: "500px" })};

  margin: 0 auto;
`;
