import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { TextareaStyleProps } from "./Textarea.types";

const inputStyle = ({
  theme: { sizes, colors, palettes },
  styleSize = "medium",
  resize
}: WithTheme<TextareaStyleProps>) => {
  const {
    blue: { base, hover, shadow },
    red: { base: errorBase, shadow: errorShadow }
  } = palettes;
  return css`
    ${size({ maxWidth: "100%" })};

    padding: ${sizes.padding[styleSize]}px;

    background-color: ${colors.backgroundPrimary};
    ${selector("boxShadow", { focus: shadow, "invalid:not(:placeholder-shown)": errorShadow })};

    border: 1px solid ${colors.border};
    border-radius: 8px;
    ${selector("borderColor", {
      hover,
      focus: base,
      "invalid:not(:placeholder-shown)": errorBase
    })};

    color: ${colors.content2};
    ${text(sizes.paragraph[styleSize])};

    resize: ${resize};
  `;
};

export const Input = styled.textarea<TextareaStyleProps>`
  ${(props) => inputStyle(props)};
`;
