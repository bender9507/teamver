import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex } from "~/styles/mixins";

export const RepositoryCard = styled.li`
  ${flex.column({ gap: 12 })};

  padding: 12px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundPrimary};
  `}

  border-radius: 16px;
`;
