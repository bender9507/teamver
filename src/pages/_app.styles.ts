import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: "100%", maxWidth: "500px", minHeight: "100vh", maxHeight: "100vh" })};

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
    max-height: -webkit-fill-available;
  }

  margin: 0 auto;
`;
