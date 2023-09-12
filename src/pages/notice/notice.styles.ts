import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LayoutContent } from "~/styles/mixins";

export const NoticeLayoutContent = styled(LayoutContent)`
  margin-top: 27px;

  ${({ theme: { colors } }) => css`
    border-top: 2px solid ${colors.gray2};
  `}
`;
