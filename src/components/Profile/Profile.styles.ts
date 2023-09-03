import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FlexColumn } from "~/styles/mixins";
import { IconButton } from "../Commons";

export const Container = styled.div`
  position: relative;

  text-align: right;

  ${({ theme: { sizes } }) => css`
    min-height: calc(100svh - ${sizes.height.header + sizes.height.navbar}px);
  `};
`;

export const SectionContainer = styled(FlexColumn)`
  padding: 32px 20px;

  text-align: left;
`;

export const FloatingIcon = styled(IconButton)`
  position: sticky;

  right: 20px;

  bottom: 28px;
`;
