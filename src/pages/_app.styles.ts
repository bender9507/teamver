import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: "100%", maxWidth: "500px", height: "100vh" })};

  margin: 0 auto;

  ${({ theme: { shadows, colors } }) => css`
    background-color: ${colors.backgroundPrimary};
    box-shadow: ${shadows.drop3};
  `}

  @supports (-webkit-touch-callout: none) {
    max-height: -webkit-fill-available;
  }
`;

export const Content = styled.div`
  overflow: scroll;

  height: 100%;
`;
