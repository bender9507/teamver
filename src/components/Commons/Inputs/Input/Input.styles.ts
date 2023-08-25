import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { InputStyleProps } from "./Input.types";

const inputStyle = ({ theme: { sizes, colors } }: WithTheme<InputStyleProps>) => {
  return css`
    ${size({ height: sizes.height.medium, maxWidth: "100%" })}

    padding: 0 ${sizes.padding.large}px;

    background-color: ${colors.backgroundSecondary};

    border: 1px solid ${colors.backgroundSecondary};
    ${selector("borderColor", { focus: colors.primary })};

    border-radius: 30px;

    color: ${colors.gray2};
    ${text(sizes.paragraph.medium)}
  `;
};

export const Input = styled.input`
  ${(props) => inputStyle(props)};
`;
