import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const SettingHeader = styled.header`
  ${flex({ justify: "end", align: "center" })};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `};

  padding: 0 18px;
`;
