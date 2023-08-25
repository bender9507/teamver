import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { InputStyleProps } from "./Input.types";

const inputStyle = ({
  theme: { sizes, colors },
  styleSize = "medium"
}: WithTheme<InputStyleProps>) => {
  return css`
    ${size({ height: sizes.height[styleSize], maxWidth: "100%" })}

    padding: 0 ${sizes.padding[styleSize]}px;

    background-color: ${colors.backgroundPrimary};

    border: 1px solid ${colors.gray2};
    border-radius: 8px;

    color: ${colors.content2};
    ${text(sizes.paragraph[styleSize])}
  `;
};

export const Input = styled.input<InputStyleProps>`
  ${(props) => inputStyle(props)};
`;
