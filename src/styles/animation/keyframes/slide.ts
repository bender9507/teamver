import { keyframes } from "@emotion/react";

export const slideY = (startPos: number) => keyframes`
  0% {
    transform: translateY(${startPos}px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const slideX = (startPos: number) => keyframes`
  0% {
    transform: translateX(${startPos}px);
  }
  100% {
    transform: translateX(0);
  }
`;

export const slideYCenter = (startPos: number) => keyframes`
  0% {
    transform: translateY(${startPos}px) translateX(-50%);
  }
  100% {
    transform: translateY(0) translateX(-50%);
  }
`;

export const slide = {
  vertical: slideY,
  horizontal: slideX
} as const;
