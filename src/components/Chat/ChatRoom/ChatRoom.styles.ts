import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const ChatHeader = styled.header`
  ${flex({ align: "center", justify: "between", gap: 15 })};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `};

  padding: 0 22px;
`;
