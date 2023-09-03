import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, position, size } from "~/styles/mixins";
import { IconButton } from "../Commons";

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;

  ${({ theme: { sizes } }) => {
    const _height = `calc(100svh - ${sizes.height.header + sizes.height.navbar}px)`;

    return css`
      ${size({ height: _height, maxHeight: _height })};
    `;
  }};
`;

export const SectionContainer = styled(FlexColumn)`
  padding: 32px 20px;

  overflow: scroll;
`;

export const FloatingIcon = styled(IconButton)`
  ${position.absolute({ bottom: 28, right: 20 })};
`;
