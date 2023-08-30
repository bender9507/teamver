import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { InputProps } from "./Input.types";

const inputStyle = ({
  theme: { sizes, colors },
  color = "backgroundSecondary"
}: WithTheme<InputProps>) => {
  return css`
    ${size({ height: sizes.height.medium, maxWidth: "100%" })}

    padding: 11px 18px 8px 18px;

    background-color: ${colors[color]};

    border: 1px solid ${colors.backgroundSecondary};
    ${selector("borderColor", { focus: colors.primary })};

    border-radius: 30px;

    ${text("textMediumBold")}
    color: ${colors.content2};
  `;
};

export const Input = styled.input<InputProps>`
  ${(props) => inputStyle(props)};
`;
