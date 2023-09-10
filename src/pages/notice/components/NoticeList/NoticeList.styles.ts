import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Card = styled.div<{ isRead: boolean }>`
  ${flex.column({ align: "between" })}
  ${size({ width: "100%" })}
  ${({ theme: { colors }, isRead }) => css`
    background-color: ${isRead ? colors.backgroundPrimary : colors.gray3};

    padding: 12px 0 12px 12px;
  `}
`;
