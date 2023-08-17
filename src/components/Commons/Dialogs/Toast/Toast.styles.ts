import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fade, slideYCenter } from "~/styles/animation";
import { position } from "~/styles/mixins";
import { hexToRgba } from "~/styles/utils";
import type { ToastStyleProps } from "./Toast.types";

const COLOR_MAP = {
  info: "blue",
  warning: "orange",
  success: "green",
  error: "red"
} as const;

export const Container = styled.div<ToastStyleProps>`
  ${position.posCenterX({ position: "fixed", bottom: 30 })}
  overflow: hidden;

  padding: 12px;

  margin-bottom: 30px;

  border-radius: 8px;

  ${({ theme: { palettes }, type = "info" }) => {
    const { base, background } = palettes[COLOR_MAP[type]];

    return css`
      background-color: ${background};

      color: ${base};
    `;
  }}

  animation: ${fade(0)} 300ms, ${slideYCenter(20)} 300ms;
`;

export const Progress = styled.div<{ type?: ToastStyleProps["type"]; value: number }>`
  ${position.absolute({ bottom: 0, left: 0 })}

  width: 100%;
  height: 3px;

  ${({ theme: { palettes }, type = "info", value }) => {
    const { base } = palettes[COLOR_MAP[type]];

    return css`
      background-color: ${hexToRgba(base, 0.5)};

      transform: scaleX(${100 - value}%);
      transform-origin: left;
    `;
  }}
`;
