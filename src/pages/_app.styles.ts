import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { size } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: "100%", maxWidth: "500px", minHeight: "100vh" })};

  margin: 0 auto;

  ${({ theme: { shadows, colors } }) => css`
    background-color: ${colors.backgroundPrimary};
    box-shadow: ${shadows.drop3};
  `}

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;
