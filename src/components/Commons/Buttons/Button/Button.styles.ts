import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, selector } from "~/styles/mixins";

export const buttonStyle = () => css``;

export const Button = styled.button`
  ${({ theme: { sizes } }) => css`
    ${flex.center()}

    height: ${sizes.height.medium};

    ${selector("opacity", { disabled: 0.5 })};
  `}
`;
