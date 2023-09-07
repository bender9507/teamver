import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  /* ${size({ width: "100%", maxWidth: "500px", minHeight: "100vh", maxHeight: "100vh" })}; */

  width: 100%;
  max-width: 500px;

  height: calc(var(--vh, 1vh) * 100);
  min-height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);

  /* @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
    max-height: -webkit-fill-available;
  } */

  background-color: red;

  margin: 0 auto;
`;
