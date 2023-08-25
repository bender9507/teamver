import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { TextareaStyleProps } from "./Textarea.types";

const inputStyle = ({
  theme: { sizes, colors },
  styleSize = "medium",
  resize
}: WithTheme<TextareaStyleProps>) => {
  return css`
    ${size({ maxWidth: "100%" })};

    padding: ${sizes.padding[styleSize]}px;

    background-color: ${colors.backgroundPrimary};

    border: 1px solid ${colors.gray3};
    border-radius: 8px;

    color: ${colors.content2};
    ${text(sizes.paragraph[styleSize])};

    resize: ${resize};
  `;
};

export const Input = styled.textarea<TextareaStyleProps>`
  ${(props) => inputStyle(props)};
`;
