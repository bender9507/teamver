import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn, flex, position } from "~/styles/mixins";
import { IconButton } from "../Commons";

export const Container = styled.div`
  ${({ theme: { sizes } }) => css`
    min-height: calc(100svh - ${sizes.height.header + sizes.height.navbar}px);
  `};
`;

export const SectionContainer = styled(FlexColumn)`
  padding: 32px 20px;
`;

export const FloatingBox = styled.div`
  ${({ theme: { sizes } }) => css`
    ${position.sticky({ bottom: sizes.height.header })};
  `};

  ${flex({ justify: "end" })};

  height: 0;

  padding: 0 20px;
`;

export const FloatingIcon = styled(IconButton)`
  position: absolute;
  bottom: 28px;
`;
