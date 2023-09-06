import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { size, text } from "~/styles/mixins";

export const Button = styled.button`
  ${text("heading5")};

  ${({ theme: { colors } }) => css`
    color: ${colors.white};

    &:disabled {
      color: ${colors.gray6};
    }
  `}
`;

export const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${size({ width: "100%", height: 44 })};

  ${({ theme: { colors } }) => css`
    border-top: 1px solid ${colors.black};

    ${Button} + ${Button} {
      border-left: 1px solid ${colors.black};
    }
  `}
`;
