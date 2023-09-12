import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, position, size } from "~/styles/mixins";

export const Card = styled.div<{ isRead: boolean }>`
  ${flex.column({ align: "between" })}
  ${size({ width: "100%" })}
  ${({ theme: { colors }, isRead }) => css`
    background-color: ${isRead ? colors.backgroundPrimary : colors.gray3};

    padding: 12px;
  `}
`;

export const EmptyContainer = styled.div`
  ${position.posCenterX({ position: "absolute", top: "290px" })}
`;
