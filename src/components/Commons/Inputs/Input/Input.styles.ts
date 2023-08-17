import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { InputStyleProps } from "./Input.types";

const inputStyle = ({
  theme: { sizes, colors, palettes },
  styleSize = "medium"
}: WithTheme<InputStyleProps>) => {
  const {
    blue: { base, hover, shadow },
    red: { base: errorBase, shadow: errorShadow }
  } = palettes;
  return css`
    ${size({ height: sizes.height[styleSize], maxWidth: "100%" })}

    padding: 0 ${sizes.padding[styleSize]}px;

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
    ${text(sizes.paragraph[styleSize])}
  `;
};

export const Input = styled.input<InputStyleProps>`
  ${(props) => inputStyle(props)};
`;
