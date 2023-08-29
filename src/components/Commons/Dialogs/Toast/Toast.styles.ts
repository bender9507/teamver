import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fade, slideYCenter } from "~/styles/animation";
import { position } from "~/styles/mixins";
import type { ToastStyleProps } from "./Toast.types";

export const Container = styled.div<ToastStyleProps>`
  ${position.posCenterX({ position: "fixed", top: 30 })}
  overflow: hidden;

  padding: 18px 16px;

  ${({ theme: { colors }, type = "info" }) => css`
    background-color: ${colors.backgroundPrimary};
    color: ${colors[type]};
  `}

  border-radius: 50px;

  animation: ${fade(0)} 300ms, ${slideYCenter(-20)} 300ms;
`;
