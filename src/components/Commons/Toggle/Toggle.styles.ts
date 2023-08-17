import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";
import type { ToggleStyleProps } from "./Toggle.types";

const TOGGLE_WIDTH = 40;

export const Container = styled.label<{ isChecked: boolean } & ToggleStyleProps>`
  ${({ theme: { colors }, isChecked, bgColor = "info" }) => css`
    ${flex({ display: "inline-flex", align: "center" })}
    overflow: hidden;

    ${size({ width: TOGGLE_WIDTH, height: 20 })}

    padding: 3px;

    background-color: ${colors[isChecked ? bgColor : "border"]};

    border-radius: 10px;

    transition: 300ms;

    cursor: pointer;
  `}
`;

export const Ball = styled.span<{ isChecked: boolean }>`
  ${({ theme: { shadows, colors }, isChecked }) => css`
    ${flex.center()}

    ${size({ width: 14, height: 14 })}

    background-color: ${colors.white};
    box-shadow: ${shadows.drop3};

    border-radius: 8px;

    ${isChecked &&
    css`
      transform: translateX(${TOGGLE_WIDTH / 2}px);
    `}
    transition: 300ms;
  `}
`;
