import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { InputStyleProps } from "./Input.types";

const containerStyle = ({
  theme: { sizes, colors },
  focus,
  color = "backgroundSecondary"
}: WithTheme<InputStyleProps & { focus: boolean }>) => {
  return css`
    ${flex({ gap: 8, align: "center" })};

    ${size({ height: sizes.height.medium, maxWidth: "100%" })}

    padding: 11px 18px;

    background-color: ${colors[color]};

    border: 1px solid ${colors[focus ? "primary" : "backgroundSecondary"]};

    border-radius: 30px;

    ${text("textMediumBold")}
  `;
};

export const Container = styled.div<InputStyleProps & { focus: boolean }>`
  ${(props) => containerStyle(props)};
`;

export const Input = styled.input`
  ${size({ width: "100%", height: "100%" })};

  ${({ theme: { colors } }) => css`
    color: ${colors.content2};
  `}

  &:focus + ${Container} {
    background-color: black;
  }
`;
