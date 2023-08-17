import { keyframes } from "@emotion/react";

export const vibration = (deg: number) => keyframes`
  0% {
    transform: rotate(${deg}deg);
  }
  50% {
    transform: rotate(-${deg}deg);
  }
  100% {
    transform: rotate(${deg}deg);
  }
`;
