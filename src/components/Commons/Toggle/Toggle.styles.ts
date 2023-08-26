import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";
import { styleHelper } from "~/styles/utils";
import type { ToggleStyleProps } from "./Toggle.types";

const TOGGLE_WIDTH = 48;

export const Container = styled.label<{ isChecked: boolean } & ToggleStyleProps>`
  ${flex({ display: "inline-flex", align: "center" })}
  overflow: hidden;

  ${size({ width: TOGGLE_WIDTH, height: 24 })}

  padding: 3px;

  ${({ theme: { colors }, isChecked }) => css`
    background-color: ${colors.gray4};

    ${isChecked && styleHelper("backgroundColor", colors.primary)};
  `}

  border-radius: 30px;

  transition: 300ms;

  cursor: pointer;
`;

export const Ball = styled.span<{ isChecked: boolean }>`
  ${({ theme: { colors }, isChecked }) => css`
    ${flex.center()}

    ${size({ width: 18, height: 18 })}

    background-color: ${colors.white};

    border-radius: 8px;

    ${isChecked &&
    css`
      background-color: ${colors.backgroundSecondary};
      transform: translateX(${TOGGLE_WIDTH / 2}px);
    `}
    transition: 300ms;
  `}
`;
