import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const textareaStyle = ({ theme: { sizes, colors } }: WithTheme) => {
  return css`
    ${size({ height: sizes.height.medium, maxWidth: "100%" })};

    padding: 11px 18px;

    background-color: ${colors.backgroundSecondary};

    border: 1px solid ${colors.backgroundSecondary};
    border-radius: 30px;
    ${selector("borderColor", { focus: colors.primary })};

    ${text("textMediumBold")}
    color: ${colors.content2};

    resize: none;

    word-wrap: break-word;
    overflow-wrap: break-word;
  `;
};

export const Textarea = styled.textarea`
  ${(props) => textareaStyle(props)};
`;
