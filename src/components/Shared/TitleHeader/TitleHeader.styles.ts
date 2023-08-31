import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const TitleHeader = styled.header`
  position: relative;

  ${flex({ align: "center" })};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `};

  padding: 0 21px;
`;
