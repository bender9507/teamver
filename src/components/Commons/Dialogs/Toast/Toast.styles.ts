import styled from "@emotion/styled";
import { fade, slideYCenter } from "~/styles/animation";
import { position } from "~/styles/mixins";
import type { ToastStyleProps } from "./Toast.types";

export const Container = styled.div<ToastStyleProps>`
  ${position.posCenterX({ position: "fixed", top: 30 })}
  overflow: hidden;

  padding: 12px;

  border-radius: 8px;

  animation: ${fade(0)} 300ms, ${slideYCenter(-20)} 300ms;
`;
