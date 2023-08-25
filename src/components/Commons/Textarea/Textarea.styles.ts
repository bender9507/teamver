import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";

const textareaStyle = ({ theme: { sizes, colors } }: WithTheme) => {
  return css`
    ${size({ height: sizes.height.medium, maxWidth: "100%" })};

    padding: 10px ${sizes.padding.large}px;

    background-color: ${colors.backgroundSecondary};

    border: 1px solid ${colors.backgroundSecondary};
    border-radius: 30px;
    ${selector("borderColor", { focus: colors.primary })};

    color: ${colors.content2};
    ${text(sizes.paragraph.medium)};

    resize: none;
  `;
};

export const Textarea = styled.textarea`
  ${(props) => textareaStyle(props)};
`;
